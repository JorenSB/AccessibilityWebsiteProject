using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;
    public CompanyController(UserManager<User> userManager, ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _context = dbContext;
    }

    private bool IsStringNotNullOrEmptyOrDefault(string? input)
    {
        if (!string.IsNullOrEmpty(input))
        {
            if (!input.Equals("string"))
            {
                return true;
            }
        }
        return false;
    }

    [HttpGet("GetCompany/{JWTToken}")]
    [Authorize(Roles = "Company")]
    public IActionResult GetCompanyData(string JWTToken)
    {
        var userIdFromToken = ValidationController.getIdentifierFromJWT(JWTToken);

        if (string.IsNullOrEmpty(userIdFromToken))
        {
            return BadRequest("Invalid or missing ID claim in the token");
        }

        Company company = _context.Companies.FirstOrDefault(c => c.Id == userIdFromToken);

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
            Address = company.Address
        };
        return Ok(companyViewModel);
    }

    [HttpPut("UpdateCompany/{JWTToken}")]
    [Authorize(Roles = "Company")]
    public async Task<IActionResult> UpdateCompany(string JWTToken, CompanyViewModel companyViewModel)
    {
        var userIdFromToken = ValidationController.getIdentifierFromJWT(JWTToken);

        if (string.IsNullOrEmpty(userIdFromToken))
        {
            return BadRequest("Invalid or missing ID claim in the token");
        }

        Company company = _context.Companies.FirstOrDefault(c => c.Id == userIdFromToken);

        if (company != null && companyViewModel != null)
        {
            if (companyViewModel.Information != null)
            {
                if (companyViewModel.Information.Equals(""))
                {
                    company.Information = null;
                }
                else
                {
                    company.Information = companyViewModel.Information;
                }
            }

            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.CompanyName))
            {
                company.CompanyName = companyViewModel.CompanyName;
            }

            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Email) && ValidationController.IsValidEmail(companyViewModel.Email))
            {
                var existingUser = await _userManager.FindByEmailAsync(companyViewModel.Email);
                if (existingUser != null)
                {
                    return BadRequest(new { Message = "Dit e-mailadres is al geregistreerd" });
                }
                company.Email = companyViewModel.Email;
                company.NormalizedEmail = companyViewModel.Email.ToUpper();
                company.UserName = companyViewModel.Email;
                company.NormalizedUserName = companyViewModel.Email.ToUpper();
            }

            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.NewPassword))
            {
                if (ValidationController.IsValidPassword(companyViewModel.NewPassword))
                    if (IsStringNotNullOrEmptyOrDefault(companyViewModel.CurrentPassword))
                    {
                        User user = _context.Users.FirstOrDefault(u => u.Id == userIdFromToken);

                        await _userManager.ChangePasswordAsync(user, companyViewModel.CurrentPassword, companyViewModel.NewPassword);
                    }
                    else
                    {
                        return BadRequest("Required new & old password to change password");
                    }
                else
                {
                    return BadRequest("Password does not meet requirements");
                }
            }

            if (companyViewModel.Url != null)
            {
                if (companyViewModel.Url.Equals(""))
                {
                    company.Url = null;
                }
                else
                {
                    company.Url = companyViewModel.Url;
                }
            }

            if (companyViewModel.KvkNumber.HasValue)
            {
                company.KvkNumber = companyViewModel.KvkNumber.Value;
            }

            if (IsStringNotNullOrEmptyOrDefault(companyViewModel.Address))
            {
                company.Address = companyViewModel.Address;
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
}