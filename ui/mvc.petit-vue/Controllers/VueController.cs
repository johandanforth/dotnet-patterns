using Microsoft.AspNetCore.Mvc;

using mvc.vue.Models;

using System.Diagnostics;

namespace mvc.vue.Controllers;

public class VueController : Controller
{
    private readonly ILogger<VueController> _logger;

    public VueController(ILogger<VueController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

  
}

[Route("api/[controller]")]
[ApiController]
public class VueApiController : ControllerBase
{
	[HttpPost]
	public ActionResult Post([FromBody] TestModel model)
	{
		Trace.TraceInformation(model.Name);
		if (model.Id == 1) return Ok(model.Id);
		return Ok();
	}

	public class TestModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}
}


