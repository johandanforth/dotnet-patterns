using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Diagnostics;
using System.Security.Principal;

using Newtonsoft.Json;

using win.auth.web.Models;

namespace win.auth.web.Controllers;
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly HttpClient _client;

    public HomeController(ILogger<HomeController> logger, IHttpContextAccessor httpContextAccessor, IHttpClientFactory clientFactory)
    {
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
        _client = clientFactory.CreateClient("webapi");
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> CallWebApi()
    {
        if(User.Identity is WindowsIdentity wid)
        {
#pragma warning disable CA1416 // Validate platform compatibility
            var result = await WindowsIdentity.RunImpersonatedAsync(wid.AccessToken, async () =>
            {
                var result = await _client.GetAsync("/Test");
                result.EnsureSuccessStatusCode();
                var content = await result.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = new
                {
                    successful = true,
                    message = content
                };
                return Json(data);


            });

            return result;
#pragma warning restore CA1416 // Validate platform compatibility
        }


        var data = new
        {
            successful = false,
            message = "Invalid User Identity!"
        };
        return Json(data);

    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
