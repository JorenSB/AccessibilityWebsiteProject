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

    public AdminPortaalController(ApplicationDbContext dbContext) {
        _dbContext = dbContext;
    }

    public bool authAdmin(string tokenJWT) {
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

        try {
            // Validate the token
            var claimsPrincipal = handler.ValidateToken(tokenJWT, validations, out var tokenSecure);
           
            var roleClaim = claimsPrincipal.Identities.First().Claims.First(o => o.Type == ClaimTypes.Role).Value;
            
            if (roleClaim == "Admin") {
                return true;
            } else {
                return false;
            }
            
        }
        catch{
            return false;
        }
    }

    [HttpGet("companies")]
    public IActionResult GetAllCompanies()
    {
        if (!authAdmin(Request.Headers["Authorization"].FirstOrDefault())) {
            return BadRequest("Invalid or Expired Token");
        }

        var companies = _dbContext.Companies.ToList();
        return Ok(companies);
    }
    
    [HttpGet("companies/{id}")]
    public IActionResult GetCompany(string? id)
    {
        if (!authAdmin(Request.Headers["Authorization"].FirstOrDefault())) {
            return BadRequest("Invalid or Expired Token");
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
    [HttpPut("companies/{id}")]
    public IActionResult PutCompany(string? id)
    {
        if (!authAdmin(Request.Headers["Authorization"].FirstOrDefault())) {
            return BadRequest("Invalid or Expired Token");
        }

        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // TODO
        // add een viewmodel met de edit info
        // add de edit functionality van joren / hook het


        return Ok();
       
    }
    
    // een get all experts
    [HttpGet("experts")]
    public IActionResult GetAllExperts()
    {
        if (!authAdmin(Request.Headers["Authorization"].FirstOrDefault())) {
            return BadRequest("Invalid or Expired Token");
        }

        var experts = _dbContext.Experts.ToList();
        return Ok(experts);
    }

    [HttpGet("experts/{id}")]
    public IActionResult GetExpert(string? id)
    {
        if (!authAdmin(Request.Headers["Authorization"].FirstOrDefault())) {
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

}