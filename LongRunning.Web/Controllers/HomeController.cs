using System.Diagnostics;
using System.Threading.Tasks;

using LongRunning.Web.Models;
using LongRunning.Web.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LongRunning.Web.Controllers;

[Authorize]
public class HomeController : Controller
{
    private readonly MyDataClientService _myDataClientService;
    private readonly ILogger<HomeController> _logger;

    public HomeController(MyDataClientService myDataClientService, ILogger<HomeController> logger)
    {
        _myDataClientService=myDataClientService;
        _logger = logger;
    }

    public async Task<IActionResult> Index()
    {
        _logger.LogInformation("User is " + User.Identity.Name);

        var result = await _myDataClientService.GetMyData();
        ViewBag.MyData = result.First();

        return View();
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
