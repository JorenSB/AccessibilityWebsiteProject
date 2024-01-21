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

    // get all
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
    // get 1
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
            return NotFound("No information found");
        }
    }
    // edit with id
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

    [HttpDelete("companies/{id}")]
    public async Task<IActionResult> DeleteCompany(string id)
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        Company Company = _context.Companies.FirstOrDefault(c => c.Id == id);

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
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return BadRequest("Invalid or Expired Token");
        }

        var experts = _context.Experts.ToList();
        return Ok(experts);
    }
    // get 1
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
            return NotFound("No information found");
        }
    }
    // edit by id
    [HttpPut("experts/{id}")]
    public async Task<IActionResult> EditExpert(string? id, [FromBody] ExpertEditViewModel data)
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
        Expert expert = _context.Experts.FirstOrDefault(c => c.Id == id);

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

            if (!string.IsNullOrEmpty(data.Email) && _validationController.IsValidEmail(data.Email))
            {
                expert.Email = data.Email;
            }

            if (!string.IsNullOrEmpty(data.NewPassword) && _validationController.IsValidPassword(data.NewPassword))
            {
                // Update the user's password directly
                var newPasswordHash = _userManager.PasswordHasher.HashPassword(expert, data.NewPassword);
                expert.PasswordHash = newPasswordHash;
            }

            _context.Experts.Update(expert);

            try
            {
                await _context.SaveChangesAsync();
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
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        Expert expert = _context.Experts.FirstOrDefault(c => c.Id == id);

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
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
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


    // Admin Profile + edit/(delete) admin

    [HttpGet("profile")]
    public IActionResult GetProfile()
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return BadRequest("Invalid or Expired Token");
        }

        var id = _validationController.getIdentifierFromJWT(Request.Headers["Authorization"].FirstOrDefault());

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try {
            Admin admin = _context.Admins.Where(e => e.Id == id).FirstOrDefault();
            return Ok(admin);
        } catch {
            return NotFound("No Information found");
        }
    }

    // Tricky concept of deleting yourself - option still available
    [HttpDelete("profile")]
    public async Task<IActionResult> deleteAdmin()
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        var id = _validationController.getIdentifierFromJWT(Request.Headers["Authorization"].FirstOrDefault());

        Admin admin = _context.Admins.FirstOrDefault(c => c.Id == id);

        if (admin == null)
        {
            return NotFound();
        }

        try{
            await _userManager.DeleteAsync(admin);
            return Ok(admin);
        }catch {
             return BadRequest();
        }
    }

    [HttpPut("profile")]
    public async Task<IActionResult> EditAdmin([FromBody] AdminEditViewModel data)
    {
        var authAdmin = _validationController.authAdmin(Request.Headers["Authorization"].FirstOrDefault());
        if (!authAdmin) {
            return Unauthorized("Invalid or Expired Token");
        }

        var id = _validationController.getIdentifierFromJWT(Request.Headers["Authorization"].FirstOrDefault());

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Retrieve the company based on the user ID
        Admin admin = _context.Admins.FirstOrDefault(c => c.Id == id);

        if (admin != null)
        {
            if (!string.IsNullOrEmpty(data.FirstName))
            {
                admin.FirstName = data.FirstName;
            }

            if (!string.IsNullOrEmpty(data.LastName))
            {
                admin.LastName = data.LastName;
            }

            if (!string.IsNullOrEmpty(data.Email) && _validationController.IsValidEmail(data.Email))
            {
                admin.Email = data.Email;
            }

            if (!string.IsNullOrEmpty(data.NewPassword) && _validationController.IsValidPassword(data.NewPassword))
            {
                // Update the user's password directly
                var newPasswordHash = _userManager.PasswordHasher.HashPassword(admin, data.NewPassword);
                admin.PasswordHash = newPasswordHash;
            }

            _context.Admins.Update(admin);

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Success");
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Error: Er ging iets mis met het aanpassen van de Admin met id: " + id);
            }
        }
        else
        {
            return NotFound("Admin niet gevonden of de data die is verstuurd is niet volledig / juist");
        }
    }
}