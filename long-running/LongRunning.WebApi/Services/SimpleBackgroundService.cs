using LongRunning.WebApi.Settings;

using Microsoft.Extensions.Options;

namespace LongRunning.WebApi.Services;

public class SimpleBackgroundService : BackgroundService 
{
    private readonly ILogger<SimpleBackgroundService> _logger;
    private readonly IOptions<SearchServiceOptions> _settings;

    public SimpleBackgroundService(ILogger<SimpleBackgroundService> logger, IOptions<SearchServiceOptions> settings)
    {
        _logger=logger;
        _settings = settings;
    }

    protected override Task ExecuteAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation($"SearchService is starting.");

        cancellationToken.Register(() =>
            _logger.LogInformation($" SearchService background task is stopping."));

        Task.Run(() =>
{
    _=ServiceLoopAsync(cancellationToken);
});

        _logger.LogInformation($"SearchService background task is stopping.");
        return Task.CompletedTask;
    }

    private async Task ServiceLoopAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            //check or do stuff here...
            _logger.LogInformation($"SearchService task doing background work.");

            //wait a while...
            await Task.Delay(_settings.Value.UpdateTime, cancellationToken);
        }

    }
}
