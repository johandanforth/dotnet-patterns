using LongRunning.WebApi.Models;
using LongRunning.WebApi.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LongRunning.WebApi.Controllers;

[Route("api/[controller]")]
[Authorize]
[EnableCors("MyAllowedSpecificOrigins")]
[ApiController]
public class SearchController : ControllerBase
{
    private readonly IBackgroundTaskQueue _queue;
    private readonly SearchService _searchService;
    private readonly ILogger<SearchController> _logger;

    public SearchController(ILogger<SearchController> logger, IBackgroundTaskQueue queue, SearchService searchService)
    {
        _queue = queue;
        _searchService = searchService;
        _logger = logger;
    }

    /// <summary>
    /// Get an existing search
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpGet]
    public ActionResult<Search> Get(Guid id)
    {
        try
        {
            var search = _searchService.GetSearch(id);
            if(search != null)
                return Ok(search);
            else
                return NotFound(new ErrorMessage($"Search {id} was not found", null));
        }
        catch(Exception e)
        {
            return StatusCode(500, new ErrorMessage(e.Message, e));
        }

    }

    /// <summary>
    /// Start a new search, or add another search to existing search session (id)
    /// </summary>
    /// <param name="searchRequest"></param>
    /// <returns></returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Post([FromBody] SearchRequest searchRequest)
    {
        try
        {
            //validate - not necessary in .net 6 with [ApiController] attribute
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            _logger.LogInformation($"Adding a search for session {searchRequest.SessionId} with search id {searchRequest.SearchId}");

            //ok, queue it, how pass parameters to it!?
            await _queue.QueueBackgroundWorkItemAsync(async () => await _searchService.StartSearch(searchRequest));

            //https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-6.0
            return CreatedAtAction(nameof(Get), new { id = searchRequest.SearchId });
        }
        catch(Exception e)
        {
            return StatusCode(500, new ErrorMessage(e.Message, e));
        }
    }

    /// <summary>
    /// Cancel a search 
    /// </summary>
    /// <param name="id"></param>
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpPut("{id}")]
    public ActionResult Put(Guid id)
    {
        
        try
        {
            var search = _searchService.GetSearch(id);
            if(search == null)
                return NotFound();

            _logger.LogInformation($"Cancelling {id}");
            _searchService.CancelSearch(id);
            return Ok();
        }
        catch(Exception e)
        {
            return StatusCode(500, new ErrorMessage(e.Message, e));
        }

    }

    /// <summary>
    /// Delete search session
    /// </summary>
    /// <param name="sessionId"></param>
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpDelete("{sessionId}")]
    public IActionResult Delete(Guid sessionId)
    {

        try
        {
            var search = _searchService.GetSearch(sessionId);
            if(search == null)
                return NotFound();

            _logger.LogInformation($"Cancelling {sessionId}");
            _searchService.CancelSearch(sessionId);
            _searchService.RemoveSearch(sessionId);
            return Ok();
        }
        catch(Exception e)
        {
            return StatusCode(500, new ErrorMessage(e.Message, e));
        }

    }

    //// GET: api/<ValuesController>
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}

    //// GET api/<ValuesController>/5
    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    //// POST api/<ValuesController>
    //[HttpPost]
    //public void Post([FromBody] string value)
    //{
    //}

    //// PUT api/<ValuesController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //// DELETE api/<ValuesController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}

