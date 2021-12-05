using basic_repository.Data;
using basic_repository.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace basic_repository.Pages;

public class IndexModel : PageModel
{
    private readonly UserRepository _userRepository;
    private readonly ILogger<IndexModel> _logger;

    public List<User> Users { get; set; }

    public IndexModel(ILogger<IndexModel> logger, UserRepository userRepository)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task<RedirectToPageResult> OnGetAddUserAsync()
    {
        await _userRepository.InsertAsync(new User(-1, "New User"));
        Users = await _userRepository.GetAllAsync();
        return RedirectToPage();
    }

    public async Task OnGetAsync()
    {
        Users = await _userRepository.GetAllAsync();
    }
}
