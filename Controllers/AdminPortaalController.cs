using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IActionResult> GetAllCompanies() {
        var getCompanies = _dbContext.Companies.ToList();
        return Ok(getCompanies);
    }

    // een get 1 by id bedrijf

    // een get all experts
    [HttpGet("experts")]
    public async Task<IActionResult> GetAllExperts() {
        var getExperts = _dbContext.Experts.ToList();
        return Ok(getExperts);
    }

    // een get 1 by id expert

}