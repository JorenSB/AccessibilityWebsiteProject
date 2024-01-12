using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using DotNetEnv;
using System.Text;

[ApiController]

[Route("api/company")]
public class BedrijfController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public BedrijfController(ApplicationDbContext dbContext) {
        _dbContext = dbContext;
    } 
    [HttpGet("/GetCompany")]
    [Authorize(Roles = "Company")] 
    
    public IActionResult GetCompanyData(string JWTToken) {
        DotNetEnv.Env.Load();
        var secret = Environment.GetEnvironmentVariable("SECRET_KEY") ?? "default_key";
        var key = Encoding.ASCII.GetBytes (secret);

        var handler = new JwtSecurityTokenHandler();
        var validations = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
        //var claims = handler.ValidateToken(JWTToken, validations, out var tokenSecure);
        try
        {
            // Validate the token
            var claimsPrincipal = handler.ValidateToken(JWTToken, validations, out var tokenSecure);

            // Access the user's name claim
            var nameClaim = claimsPrincipal.FindFirst("name");
            string userName = nameClaim?.Value ?? "Unknown";

            // Access the user's ID claim
            var idClaim = claimsPrincipal.FindFirst("nameidentifier");
            string userId = idClaim?.Value ?? "Unknown";

            // Now you can use userName and userId in your logic
            // ...

            return Ok(new { UserName = userName, UserId = userId });
        }
        catch (Exception ex)
        {
            // Handle validation errors
            return BadRequest("Invalid token");
        }
    }
    // {
    //      if (id == null || !ModelState.IsValid)
    // {
    //     return BadRequest(ModelState);
    // }

    // Company company = _dbContext.Companies.Where(e => e.Id == id).FirstOrDefault();

    // if (company == null)
    // {
    //     return NotFound("Expert not found pik");
    // }
    //     // steps
    //     // stuur token mee
    //     // check of de token echt is / igelogd / active / je moeder
    //     // get met db context de company based on token info

    //     // Voeg hier je beveiligde logica toe
    //     return Ok(new { Message = "Secure data retrieved successfully" });
    // }
}
