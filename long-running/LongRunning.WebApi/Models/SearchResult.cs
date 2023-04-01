namespace LongRunning.WebApi.Models;

public class SearchResult
{
    /// <summary>
    /// The "sub search" id that corresponds to the search request id
    /// </summary>
    public Guid SearchRequestId { get; set; }

    public string? Answer { get; set; }

    /// <summary>
    /// The time when the search was completed
    /// </summary>
    public DateTime Completed { get; internal set; }
}