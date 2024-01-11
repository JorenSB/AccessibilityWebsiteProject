using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

[ApiController]
[Route("api/portaal/admin")]
public class AdminPortaalController : ControllerBase
{
    // variables
    private readonly ApplicationDbContext _dbContext;

    public AdminPortaalController(ApplicationDbContext dbContext) {
        _dbContext = dbContext;
    }

    // een get all bedrijven
    [HttpGet("companies")]
    public IActionResult GetAllCompanies() => Ok(_dbContext.Companies.ToList().OrderBy(x => x.CompanyName));
    
    [HttpGet("companies/{id}")]
    public IActionResult GetCompany(string? id)
    {
        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        Company company = _dbContext.Companies.Where(c => c.Id == id).FirstOrDefault();

        if (company == null)
        {
            return NotFound("Company not found pik");
        }

        return Ok(company);
    }

    // een get all experts
    [HttpGet("experts")]
    public IActionResult GetAllExperts() => Ok(_dbContext.Experts.ToList().OrderBy(x => x.FirstName));

    [HttpGet("experts/{id}")]
    public IActionResult GetExpert(string? id)
    {
        if (id == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        Expert expert = _dbContext.Experts.Where(e => e.Id == id).FirstOrDefault();

        if (expert == null)
        {
            return NotFound("Expert not found pik");
        }

        return Ok(expert);
    }

}