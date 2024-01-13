using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private bool IsStringNotNullOrEmptyOrDefault(string? input)
    {
        if(!string.IsNullOrEmpty(input)) {
            if (!input.Equals("string")) {
                return true;
            }   
        }
        return false;
    }
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
            Company company = _context.Companies.First(c => c.Id == idClaim);
            CompanyViewModel companyViewModel = new CompanyViewModel
            {
                Information = company.Information,
                CompanyName = company.CompanyName,
                Email = company.Email,
                Url = company.Url,
                KvkNumber = company.KvkNumber,
                Address = company.Address
            };
            return Ok(companyViewModel);
            // return Ok(new { UserName = nameClaim, UserId = idClaim });
        }
        catch (Exception ex)
        {
            // Handle validation errors
            return BadRequest("Invalid token");
        }
    }



    [HttpPut("UpdateCompany/{JWTToken}")]
    [Authorize(Roles = "Company")]
    public async Task<IActionResult> UpdateCompany(string JWTToken, CompanyViewModel companyViewModel)
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

            User user = _context.Users.First(c => c.Id == idClaim);
            Company company = _context.Companies.First(c => c.Id == idClaim);

            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Information)) {
                company.Information = companyViewModel.Information;
            }
            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.CompanyName)) {
                company.CompanyName = companyViewModel.CompanyName;
            }
            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Email)) {
                company.Email = companyViewModel.Email;
                company.NormalizedEmail = companyViewModel.Email.ToUpper();
                company.UserName = companyViewModel.Email;
                company.NormalizedUserName = companyViewModel.Email.ToUpper();
            }
            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Password))
            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Url)) {
                company.Url = companyViewModel.Url;
            }
            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.KvkNumber)) {
                company.KvkNumber = companyViewModel.KvkNumber;
            }
            if (companyViewModel.Address != null)
            {
                if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Address.Streetname)) {
                    company.Address.Streetname = companyViewModel.Address.Streetname;
                }
                if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Address.City)) {
                    company.Address.City = companyViewModel.Address.City;
                }
                if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Address.Country)) {
                    company.Address.Country = companyViewModel.Address.Country;
                }
                if (companyViewModel.Address.HouseNumber != 0) {
                    company.Address.HouseNumber = companyViewModel.Address.HouseNumber;
                }
            }
            _context.Companies.Update(company);
            try
            {
                await _context.SaveChangesAsync();
                return Ok("Success");
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Error while updating the information");
            }
        }
        catch (Exception ex)
        {
            return BadRequest("Invalid or expired token");
        }
    }
}