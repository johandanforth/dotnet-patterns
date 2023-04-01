using System.Collections.Concurrent;

using LongRunning.WebApi.Models;

namespace LongRunning.WebApi.Services;

public class SearchService
{
    private const int loopCount = 10;

    private readonly ILogger<SearchService> _logger;
    readonly ConcurrentDictionary<Guid, Search> _searches = new();

    public SearchService(ILogger<SearchService> logger)
    {
        _logger = logger;
    }

    public async Task StartSearch(SearchRequest searchRequest)
    {
        if(_searches.TryGetValue(searchRequest.SessionId, out var search))
        {
            search.Searches.Add(searchRequest);
        }
        else
        {
            //add new 
            search = new Search()
            {
                Searches = new List<SearchRequest> { searchRequest },
                CancellationTokenSource = new CancellationTokenSource()
            };
            _searches[searchRequest.SessionId] = search;
        }

        var token = search.CancellationTokenSource.Token;
        var guid = searchRequest.SessionId;
        var delayLoop = 0;

        _logger.LogInformation("Queued Background Task {Guid} is starting.", guid);

        while(!token.IsCancellationRequested && delayLoop < loopCount)
        {
            try
            {
                await Task.Delay(TimeSpan.FromSeconds(5), token);
            }
            catch(OperationCanceledException)
            {
                _logger.LogError("Operation Cancelled Exception in delay!");
                // Prevent throwing if the Delay is cancelled
            }

            delayLoop++;
            _logger.LogInformation($"Queued Background Task {guid} is running. {delayLoop}/{loopCount}");
        }

        if(delayLoop == loopCount)
        {
            _logger.LogInformation("Queued Background Task {Guid} is complete.", guid);

            if(search.Results == null)
                search.Results = new();

            search.Results.Add(new SearchResult() { Answer = "42", Completed = DateTime.Now });
        }
        else
        {
            _logger.LogError("Queued Background Task {Guid} was cancelled.", guid);
        }

    }

    /// <summary>
    /// Returns the original search request
    /// </summary>
    /// <param name="sessionId"></param>
    /// <returns></returns>
    public Search? GetSearch(Guid sessionId)
    {
        return _searches.ContainsKey(sessionId) ? _searches[sessionId] : (Search?)null;
    }

    /// <summary>
    /// Returns just the results array for a search
    /// </summary>
    /// <param name="sessionId"></param>
    /// <returns></returns>
    public List<SearchResult>? GetSearchResults(Guid sessionId)
    {
        return _searches.ContainsKey(sessionId) ? _searches[sessionId].Results : null;
    }

    /// <summary>
    /// Gets the search, calls cancel on the token source
    /// </summary>
    /// <param name="sessionId"></param>
    /// <returns></returns>
    public void CancelSearch(Guid sessionId)
    {
        _searches[sessionId].CancellationTokenSource?.Cancel();
    }

    public void RemoveSearch(Guid sessionId)
    {
        if(_searches.ContainsKey(sessionId))
        {
            _searches.Remove(sessionId, out var val);
        }
    }
}