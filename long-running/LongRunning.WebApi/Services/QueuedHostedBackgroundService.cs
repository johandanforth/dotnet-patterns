namespace LongRunning.WebApi.Services;

/// <summary>
/// Pops items from the background task queue and runs them
/// </summary>
public class QueuedHostedBackgroundService : BackgroundService
{
    private readonly ILogger<QueuedHostedBackgroundService> _logger;

    public QueuedHostedBackgroundService(IBackgroundTaskQueue taskQueue, ILogger<QueuedHostedBackgroundService> logger)
    {
        TaskQueue = taskQueue;
        _logger = logger;
    }

    public IBackgroundTaskQueue TaskQueue { get; }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation($"Queued Hosted Service is running.");
        await BackgroundProcessing(cancellationToken);
    }

    private async Task BackgroundProcessing(CancellationToken cancellationToken)
    {
        while(!cancellationToken.IsCancellationRequested)
        {
            _logger.LogInformation($"Waiting for queued tasks...");
            var workItem = await TaskQueue.DequeueAsync();

            try
            {
                _logger.LogInformation($"Executing workitem...");
                _ = workItem();
                //await workItem(cancellationToken);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error occurred executing {WorkItem}.", nameof(workItem));
            }
        }
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Queued Hosted Service is stopping.");

        await base.StopAsync(cancellationToken);
    }
}