using LongRunning.WebApi.Models;
using LongRunning.WebApi.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LongRunning.WebApi.Controllers;

/// <summary>
/// Handles search results
/// </summary>
[Route("api/[controller]")]
[Authorize]
[EnableCors("MyAllowedSpecificOrigins")]
[ApiController]
public class ResultsController : ControllerBase
{
    private readonly IBackgroundTaskQueue _queue;
    private readonly SearchService _searchService;
    private readonly ILogger<SearchController> _logger;

    public ResultsController(ILogger<SearchController> logger, IBackgroundTaskQueue queue, SearchService searchService)
    {
        _queue = queue;
        _searchService = searchService;
        _logger = logger;
    }

    /// <summary>
    /// Get a list of search results
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpGet]
    public ActionResult<List<SearchResult>> Get(Guid id)
    {
        try
        {
            //look for an answer in the results
            var results = _searchService.GetSearchResults(id);
            if(results != null)
                return Ok(results);
            else
                return NotFound(new ErrorMessage($"Results for search {id} was not found", null));
        }
        catch(Exception e)
        {
            return StatusCode(500, new ErrorMessage(e.Message, e));
        }

    }

}

