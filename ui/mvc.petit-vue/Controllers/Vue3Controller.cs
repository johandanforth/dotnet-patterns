using Microsoft.AspNetCore.Mvc;

namespace mvc.vue.Controllers;

public class Vue3Controller
    : Controller
{
    private readonly ILogger<PetiteVueController> _logger;

    public Vue3Controller(ILogger<PetiteVueController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }



}
