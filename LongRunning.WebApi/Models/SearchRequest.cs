using System.ComponentModel.DataAnnotations;

namespace LongRunning.WebApi2.Models;

public class SearchRequest
{
    public SearchRequest()
    {
        SearchId = Guid.NewGuid();
    }

    /// <summary>
    /// The overall session id
    /// </summary>
    [Required(ErrorMessage = "SessionId must be supplied")]
    public Guid SessionId { get; set; }

    /// <summary>
    /// The "sub search" id, created by the system
    /// </summary>
    public Guid SearchId { get; set; }

    /// <summary>
    /// Something to search for
    /// </summary>
    [Required(ErrorMessage = "A question must be supplied")]
    public string? SearchText { get; set; }
}
