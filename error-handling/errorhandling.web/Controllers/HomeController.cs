using errorhandling.web.Extensions;
using errorhandling.web.Models;

using Microsoft.AspNetCore.Mvc;

using System.Diagnostics;

namespace errorhandling.web.Controllers;


internal record ErrorMessage(string Message, Exception? Exception);

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult AjaxCall(bool shouldFail = false)
    {
        if(shouldFail)
            //throw new Exception("Something bad happened!");
            //return StatusCode(500, "Baaaad!");
            return StatusCode(500, new ErrorMessage("Something bad happened", new Exception("An Exception Message goes here")));

        var result = new
        {
            message = "Hello World"
        };
        return new JsonResult(result);
    }

    public IActionResult HrefError()
    {
        try
        {
            throw new Exception("Oh no!!");
        }
        catch(Exception e)
        {
            return RedirectToAction(nameof(Index)).WithError(e.Message);
        }
        return RedirectToAction(nameof(Index));
    }

    public IActionResult HrefErrorMany()
    {
        TempData.Error("Error 1");
        return RedirectToAction(nameof(Index)).WithError("Error 2");
    }

    public IActionResult HrefOk()
    {
        return RedirectToAction(nameof(Index)).WithSuccess("All is well!");
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
