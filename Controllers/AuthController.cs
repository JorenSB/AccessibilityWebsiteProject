using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model) 
    {
        var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

        if (result.Succeeded)
        {
            return Ok(new { Message = "Login successful" });
        }
        else
        {
            return BadRequest(new { Message = "Login failed" });
        }
    }

    [HttpPost("registerExpert")]
    public async Task<IActionResult> RegisterExpert([FromBody] RegisterExpertViewModel model)
    {
        // Maak een nieuwe Expert-gebruiker
        var expert = new Expert
        {
            Email = model.Email,
            rol = "Expert",
            EmailConfirmed = true,
            UserName = model.Email,
            FirstName = model.FirstName, 
            LastName = model.LastName
        };

        // Probeer de gebruiker te registreren
        var result = await _userManager.CreateAsync(expert, model.Password);

        // Controleer het resultaat van de registratiepoging
        if (result.Succeeded)
        {
            // Registratie is gelukt
            return Ok("Expert geregistreerd");
        }

        // Registratie is mislukt, geef een foutmelding terug
        return BadRequest("Er is iets misgegaan bij de registratie van de expert");
    }




    [HttpPost("registerCompany")]
    public async Task<IActionResult> RegisterCompany([FromBody] RegisterCompanyViewModel model)
    {
        // Maak een nieuwe Company-gebruiker
        var company = new Company
        {
            Email = model.Email,
            UserName = model.Email,
            CompanyName = model.CompanyName,
            rol = "Bedrijf",
            EmailConfirmed = true,
            KvkNumber = model.KVK
        };

        // Probeer de gebruiker te registreren
        var result = await _userManager.CreateAsync(company, model.Password);

        // Controleer het resultaat van de registratiepoging
        if (result.Succeeded)
        {
            // Registratie is gelukt
            return Ok("Bedrijf geregistreerd");
        }

        // Registratie is mislukt, geef een foutmelding terug
        return BadRequest("Er is iets misgegaan bij de registratie van het bedrijf");
    }

}