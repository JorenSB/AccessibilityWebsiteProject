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
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<User> _userManager;

    public AdminPortaalController(ApplicationDbContext dbContext, UserManager<User> userManager) {
        _userManager = userManager;
        _dbContext = dbContext;
    }

    // get all
    [HttpGet("companies")]
    public IActionResult GetAllCompanies()
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());

        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        var companies = _dbContext.Companies.ToList();
        return Ok(companies);
    }
    // get 1
    [HttpGet("companies/{id}")]
    public IActionResult GetCompany(string? id)
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try {
            Company company = _dbContext.Companies.Where(c => c.Id == id).FirstOrDefault();
            return Ok(company);
        } catch {
            return NotFound("Company not found pik");
        }
    }
    // edit with id
    [HttpPut("companies/{id}")]
    public async Task<IActionResult> PutCompany(string? id, [FromBody] CompanyViewModel companyEditModel)
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Retrieve the company based on the user ID
        Company company = _dbContext.Companies.FirstOrDefault(c => c.Id == id);

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

            if (!string.IsNullOrEmpty(companyEditModel.Email) && ValidationController.IsValidEmail(companyEditModel.Email))
            {
                company.Email = companyEditModel.Email;
            }

            if (!string.IsNullOrEmpty(companyEditModel.NewPassword) && ValidationController.IsValidPassword(companyEditModel.NewPassword))
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

            _dbContext.Companies.Update(company);

            try
            {
                await _dbContext.SaveChangesAsync();
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

    [HttpDelete("companies/{id}")]
    public async Task<IActionResult> DeleteCompany(string id)
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        Company Company = _dbContext.Companies.FirstOrDefault(c => c.Id == id);

        if (Company == null)
        {
            return NotFound();
        }

        try{
            await _userManager.DeleteAsync(Company);
            return Ok(Company);
        }catch {
             return BadRequest();
        }
    }
    
    // een get all experts
    [HttpGet("experts")]
    public IActionResult GetAllExperts()
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return BadRequest("Invalid or Expired Token");
        }

        var experts = _dbContext.Experts.ToList();
        return Ok(experts);
    }
    // get 1
    [HttpGet("experts/{id}")]
    public IActionResult GetExpert(string? id)
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return BadRequest("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try {
            Expert expert = _dbContext.Experts.Where(e => e.Id == id).FirstOrDefault();
            return Ok(expert);
        } catch {
            return NotFound("Company not found pik");
        }
    }
    // edit by id
    [HttpPut("experts/{id}")]
    public async Task<IActionResult> EditExpert(string? id, [FromBody] ExpertEditViewModel data)
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Retrieve the company based on the user ID
        Expert expert = _dbContext.Experts.FirstOrDefault(c => c.Id == id);

        if (expert != null)
        {
            if (!string.IsNullOrEmpty(data.FirstName))
            {
                expert.FirstName = data.FirstName;
            }

            if (!string.IsNullOrEmpty(data.LastName))
            {
                expert.LastName = data.LastName;
            }

            if (!string.IsNullOrEmpty(data.Email) && ValidationController.IsValidEmail(data.Email))
            {
                expert.Email = data.Email;
            }

            if (!string.IsNullOrEmpty(data.NewPassword) && ValidationController.IsValidPassword(data.NewPassword))
            {
                // Update the user's password directly
                var newPasswordHash = _userManager.PasswordHasher.HashPassword(expert, data.NewPassword);
                expert.PasswordHash = newPasswordHash;
            }

            _dbContext.Experts.Update(expert);

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok("Success");
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Error: Er ging iets mis met het aanpassen van de gebruiker met id: " + id);
            }
        }
        else
        {
            return NotFound("Deskundige niet gevonden of de data die is verstuurd is niet volledig / juist");
        }
    }

    [HttpDelete("experts/{id}")]
    public async Task<IActionResult> DeleteExpert(string id)
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        Expert expert = _dbContext.Experts.FirstOrDefault(c => c.Id == id);

        if (expert == null)
        {
            return NotFound();
        }

        try{
            await _userManager.DeleteAsync(expert);
            return Ok(expert);
        }catch {
             return BadRequest();
        }
    }

    // aanmaken nieuwe admin
    [HttpPost("create/admin")]
    public async Task<IActionResult> RegisterAdmin([FromBody] RegisterAdminViewModel model)
    {
        var authAdmin = ValidationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        var admin = new Admin
        {
            Email = model.Email,
            EmailConfirmed = true,
            UserName = model.Email,
            FirstName = model.FirstName, 
            LastName = model.LastName
        };

        try {
            var result = await _userManager.CreateAsync(admin, model.Password);

            if (result.Succeeded)
            {
                // Geef de rol "Admin" aan de nieuwe gebruiker
                await _userManager.AddToRoleAsync(admin, "Admin");

                return Ok("Admin geregistreerd");
            }
        }
        catch {
            return BadRequest("Er is iets misgegaan bij de toevoegen van een Admin");
        }
        return BadRequest("Er is iets misgegaan, neem contact op met de developers");
    }

}