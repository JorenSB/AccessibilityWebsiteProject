using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public CompanyController(ApplicationDbContext dbContext)
    {
        _context = dbContext;
    }

    [HttpGet("GetCompany/{JWTToken}")]
    [Authorize(Roles = "Company")]
    public IActionResult GetCompanyData(string JWTToken)
    {
        DotNetEnv.Env.Load();
        var secret = Environment.GetEnvironmentVariable("SECRET_KEY") ?? "default_key";
        var key = Encoding.ASCII.GetBytes(secret);

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

            // Access the user's ID claim
            var idClaim = claimsPrincipal.Identities.First().Claims.First(o => o.Type == ClaimTypes.NameIdentifier).Value;


            // Now you can use userName and userId in your logic
            // ...
            User user = _context.Users.First(u => u.Id == idClaim);
            return Ok(user);
            // return Ok(new { UserName = nameClaim, UserId = idClaim });
        }
        catch (Exception ex)
        {
            // Handle validation errors
            return BadRequest("Invalid token");
        }
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutCompany(string id, Company company)
    {
        if (id != company.Id)
        {
            return BadRequest();
        }

        Company c1 = _context.Companies.First(c => c.Id == company.Id);
        foreach (var property in typeof(Company).GetProperties())
        {
            var value1 = property.GetValue(c1);
            var value2 = property.GetValue(company);

            // If values are not equal, objects are not equal
            if (!Equals(value1, value2))
                property.SetValue(c1, value2);

        }

        _context.Companies.Update(c1);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CompanyExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    private bool CompanyExists(string id)
    {
        return (_context.Companies?.Any(e => e.Id == id)).GetValueOrDefault();
    }
    

}
