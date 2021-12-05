using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace win.auth.webapi.Controllers;
[Authorize]
[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{

    private readonly ILogger<TestController> _logger;

    public TestController(ILogger<TestController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public string Get()
    {
        return User.Identity is not { IsAuthenticated: true } ? 
            "Not authenticated" : 
            $"Authorized and Authenticated as {User.Identity.Name} at {DateTime.Now.ToLongTimeString()}";
    }
}
