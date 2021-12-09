using Microsoft.AspNetCore.Mvc;

namespace mvc.vue.Controllers;

public class PetiteVueController : Controller
{
    private readonly ILogger<PetiteVueController> _logger;

    public PetiteVueController(ILogger<PetiteVueController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }



}
