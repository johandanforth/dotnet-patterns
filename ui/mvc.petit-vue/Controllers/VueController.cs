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
	
    public IActionResult Components()
    {
        return View();
    }
	
    public IActionResult Classes()
    {
        return View();
    }

  
}

