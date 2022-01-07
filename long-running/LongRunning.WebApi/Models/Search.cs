using System.Text.Json.Serialization;

namespace LongRunning.WebApi2.Models;

public class Search
{
    public Guid SessionId { get; set; }

    public List<SearchRequest>? Searches { get; set; }

    public List<SearchResult>? Results { get; set; }

    [JsonIgnore]
    public CancellationTokenSource? CancellationTokenSource { get; set; }

}
