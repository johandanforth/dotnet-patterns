using System.Threading.Channels;

namespace LongRunning.WebApi.Services;

public interface IBackgroundTaskQueue
{
    ValueTask QueueBackgroundWorkItemAsync(Func<ValueTask> workItem);
    ValueTask<Func<ValueTask>> DequeueAsync();
}

public class BackgroundTaskQueue : IBackgroundTaskQueue
{
    private readonly Channel<Func<ValueTask>> _queue;

    public BackgroundTaskQueue(int capacity)
    {
        // Capacity should be set based on the expected application load and
        // number of concurrent threads accessing the queue.            
        // BoundedChannelFullMode.Wait will cause calls to WriteAsync() to return a task,
        // which completes only when space became available. This leads to backpressure,
        // in case too many publishers/calls start accumulating.
        var options = new BoundedChannelOptions(capacity)
        {
            FullMode = BoundedChannelFullMode.Wait
        };

        _queue = Channel.CreateBounded<Func<ValueTask>>(options);
    }

    public async ValueTask QueueBackgroundWorkItemAsync(Func<ValueTask> workItem)
    {
        if (workItem == null)
        {
            throw new ArgumentNullException(nameof(workItem));
        }

        await _queue.Writer.WriteAsync(workItem);
    }

    public async ValueTask<Func<ValueTask>> DequeueAsync()
    {
        return await _queue.Reader.ReadAsync();
    }
}