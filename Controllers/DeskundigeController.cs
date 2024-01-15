using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/deskundige")]
public class DeskundigeController : ControllerBase
{

     private readonly ApplicationDbContext _context;

    public DeskundigeController(ApplicationDbContext context)
    {
        _context = context;
    }


   [HttpGet("getuser")]
    public IActionResult GetUserData([FromHeader] string jwt)
    {
        try
        {
            var userId = ValidationController.getIdentifierFromJWT(jwt);
            // Check if the header contains the 'id' information
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("token is invalid.");
            }

            // Your logic to fetch user data based on the ID
            Expert expert = _context.Experts
                .Include(e => e.Disabilities)
                .Include(e => e.DisabilityAids) 
                .FirstOrDefault(c => c.Id == userId);

            // Check if the expert was found
            if (expert == null)
            {
                return NotFound($"Expert with ID {userId} not found.");
            }

            // Create an ExpertProfileModel and populate it with data
            var userData = new ExpertProfileModel
            {
                Email = expert.UserName,
                FirstName = expert.FirstName,
                LastName = expert.LastName,
                PhoneNumber = expert.PhoneNumber,
                BirthDate = expert.BirthDate,
                Disabilities = expert.Disabilities.Select(d => d.DisabilityName).ToList(),
                DisabilityAids = expert.DisabilityAids.Select(a => a.DisabilityAidName).ToList()
            };

            // Return the user data in the response
            return Ok(userData);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it accordingly
            // You might want to return a more informative error message
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }


    [HttpGet("getdisabilities")]
    public IActionResult GetDisabilityData()
    {
        try
        {
            var disabilities = _context.Disabilities.Select(d => d.DisabilityName).Distinct().ToList();    

            // Check if the result is null or empty
            if (disabilities == null || disabilities.Count == 0)
            {
                return NotFound( new {message = "No disabilities found."});
            }

            return Ok(disabilities);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it as needed
            return StatusCode(500, "An error occurred while fetching disabilities data.");
        }
    }

    [HttpGet("getdisabilityAids")]
    public IActionResult GetDisabilityAidsData()
    {
        try
        {
            var disabilityAids = _context.DisabilityAids.Select(d => d.DisabilityAidName).Distinct().ToList();    

            // Check if the result is null or empty
            if (disabilityAids == null || disabilityAids.Count == 0)
            {
                return NotFound( new {message = "No disability aids found."});
            }

            return Ok(disabilityAids);
        }
        catch (Exception ex)
        {
            // Log the exception or handle it as needed
            return StatusCode(500, "An error occurred while fetching disability aids data.");
        }
    }
}
