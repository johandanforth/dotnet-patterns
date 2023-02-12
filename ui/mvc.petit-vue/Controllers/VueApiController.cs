using System.Diagnostics;

using Microsoft.AspNetCore.Mvc;

namespace mvc.vue.Controllers;

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