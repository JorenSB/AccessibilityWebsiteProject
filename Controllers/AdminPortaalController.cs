using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/portaal/admin")]
public class AdminPortaalController : ControllerBase
{
    // variables
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly ValidationController _validationController;

    public AdminPortaalController(UserManager<User> userManager, ApplicationDbContext dbContext, ValidationController validationController)
    {
        _userManager = userManager;
        _context = dbContext;
        _validationController = validationController;
    }

    [HttpGet("companies")]
    public IActionResult GetAllCompanies()
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());

        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        var companies = _context.Companies.ToList();
        return Ok(companies);
    }
    
    [HttpGet("companies/{id}")]
    public IActionResult GetCompany(string? id)
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try {
            Company company = _context.Companies.Where(c => c.Id == id).FirstOrDefault();
            return Ok(company);
        } catch {
            return NotFound("Company not found pik");
        }
    }
    [HttpPut("companies/{id}")]
    public async Task<IActionResult> PutCompany(string? id, [FromBody] CompanyViewModel companyEditModel)
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Retrieve the company based on the user ID
        Company company = _context.Companies.FirstOrDefault(c => c.Id == id);

        if (company != null)
        {
            if (!string.IsNullOrEmpty(companyEditModel.Information))
            {
                company.Information = companyEditModel.Information;
            }

            if (!string.IsNullOrEmpty(companyEditModel.CompanyName))
            {
                company.CompanyName = companyEditModel.CompanyName;
            }

            if (!string.IsNullOrEmpty(companyEditModel.Email) && _validationController.IsValidEmail(companyEditModel.Email))
            {
                company.Email = companyEditModel.Email;
            }

            if (!string.IsNullOrEmpty(companyEditModel.NewPassword) && _validationController.IsValidPassword(companyEditModel.NewPassword))
            {
                // Update the user's password directly
                var newPasswordHash = _userManager.PasswordHasher.HashPassword(company, companyEditModel.NewPassword);
                company.PasswordHash = newPasswordHash;
            }

            if (!string.IsNullOrEmpty(companyEditModel.Url))
            {
                company.Url = string.IsNullOrEmpty(companyEditModel.Url) ? null : companyEditModel.Url;
            }

            if (companyEditModel.KvkNumber.HasValue)
            {
                company.KvkNumber = companyEditModel.KvkNumber.Value;
            }

            if (!string.IsNullOrEmpty(companyEditModel.Address))
            {
                company.Address = companyEditModel.Address;
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
            return NotFound("Company not found or invalid CompanyViewModel");
        }
    }
    
    // een get all experts
    [HttpGet("experts")]
    public IActionResult GetAllExperts()
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return BadRequest("Invalid or Expired Token");
        }

        var experts = _context.Experts.ToList();
        return Ok(experts);
    }

    [HttpGet("experts/{id}")]
    public IActionResult GetExpert(string? id)
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return BadRequest("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try {
            Expert expert = _context.Experts.Where(e => e.Id == id).FirstOrDefault();
            return Ok(expert);
        } catch {
            return NotFound("Company not found pik");
        }
    }

}