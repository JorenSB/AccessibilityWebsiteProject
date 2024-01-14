using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;

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

        try
        {
            var claimsPrincipal = handler.ValidateToken(JWTToken, validations, out var tokenSecure);

            var idClaim = claimsPrincipal?.Claims?.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(idClaim))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            Company company = _context.Companies.FirstOrDefault(c => c.Id == idClaim);

            if (company == null)
            {
                return NotFound("Company not found");
            }

            CompanyViewModel companyViewModel = new CompanyViewModel
            {
                Information = company.Information,
                CompanyName = company.CompanyName,
                Email = company.Email,
                Url = company.Url,
                KvkNumber = company.KvkNumber,
                Address = new AddressViewModel(company.Address)
            };

            return Ok(companyViewModel);
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            Console.WriteLine($"Exception: {ex}");

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

        try
        {
            // Validate the token
            var claimsPrincipal = handler.ValidateToken(JWTToken, validations, out var tokenSecure);

            if (claimsPrincipal != null)
            {
                // Access the user's ID claim
                var idClaim = claimsPrincipal.Identities.FirstOrDefault()?.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(idClaim))
                {
                    return BadRequest("Invalid or missing ID claim in the token");
                }

                User user = _context.Users.FirstOrDefault(c => c.Id == idClaim);
                Company company = _context.Companies.FirstOrDefault(c => c.Id == idClaim);

                if (company != null && companyViewModel != null)
                {
                    if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Information))
                    {
                        company.Information = companyViewModel.Information;
                    }

                    if (IsStringNotNullOrEmptyOrDefault(companyViewModel.CompanyName))
                    {
                        company.CompanyName = companyViewModel.CompanyName;
                    }

                    if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Email))
                    {
                        company.Email = companyViewModel.Email;
                        company.NormalizedEmail = companyViewModel.Email.ToUpper();
                        company.UserName = companyViewModel.Email;
                        company.NormalizedUserName = companyViewModel.Email.ToUpper();
                    }

                    if (IsStringNotNullOrEmptyOrDefault(companyViewModel.NewPassword) && ValidationController.IsValidPassword(companyViewModel.NewPassword))
                    {
                        if (IsStringNotNullOrEmptyOrDefault(companyViewModel.CurrentPassword))
                        {
                            return BadRequest("Required new & old password to change password");
                        }

                        // TODO: Implement password change using SignInManager.ChangePasswordAsync
                    }

                    if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Url))
                    {
                        company.Url = companyViewModel.Url;
                    }

                    if (IsStringNotNullOrEmptyOrDefault(companyViewModel.KvkNumber))
                    {
                        company.KvkNumber = companyViewModel.KvkNumber;
                    }

                    if (companyViewModel.Address != null) // TODO: fix this shit not working :)
                    {
                        // Check if all required fields are filled in
                        if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Address.Streetname) &&
                            IsStringNotNullOrEmptyOrDefault(companyViewModel.Address.City) &&
                            IsStringNotNullOrEmptyOrDefault(companyViewModel.Address.Country) &&
                            companyViewModel.Address.HouseNumber.HasValue)
                        {
                            // Update company.Address properties
                            company.Address.Streetname = companyViewModel.Address.Streetname;
                            company.Address.City = companyViewModel.Address.City;
                            company.Address.Country = companyViewModel.Address.Country;
                            company.Address.HouseNumber = companyViewModel.Address.HouseNumber.Value;
                        }
                        else
                        {
                            // If any of the required fields are missing, return a bad request
                            return BadRequest("Address fields are incomplete");
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
                else
                {
                    return BadRequest("Invalid company or companyViewModel");
                }
            }
            else
            {
                return BadRequest("Invalid token");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            Console.WriteLine($"Stack Trace: {ex.StackTrace}");
            return BadRequest("Unknown error");
        }
    }
}