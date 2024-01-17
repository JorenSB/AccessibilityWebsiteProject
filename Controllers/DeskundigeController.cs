using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Users.Expert;

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
    public IActionResult GetUserData()
    {
        try
        {
            var userId = ValidationController.getIdentifierFromJWT(Request.Headers["Authorization"].FirstOrDefault());
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
                DisabilityAids = expert.DisabilityAids.Select(a => a.DisabilityAidName).ToList(),
                CommercialContact = expert.CommercialContact,
                PhonePreference = expert.PhonePreference,
                EmailPreference = expert.EmailPreference
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
    


    [HttpPut("updateuser")]
    public IActionResult UpdateUserData([FromBody] UpdatedExpertProfileModel updatedUserData)
    {
        try
        {
            var userId = ValidationController.getIdentifierFromJWT(Request.Headers["Authorization"].FirstOrDefault());

            // Check if the header contains the 'id' information
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Token is invalid.");
            }

            // Your logic to fetch the expert based on the ID
            Expert expert = _context.Experts
                .Include(e => e.Disabilities)
                .Include(e => e.DisabilityAids)
                .FirstOrDefault(c => c.Id == userId);

            // Check if the expert was found
            if (expert == null)
            {
                return NotFound($"Expert with ID {userId} not found." );    
            }

            // Use reflection to iterate through the properties of UpdatedExpertProfileModel
            foreach (var property in typeof(UpdatedExpertProfileModel).GetProperties())
            {
                // Check if the property has a value
                var value = property.GetValue(updatedUserData);

                if (value != null)
                {
                    // Update the corresponding property in the Expert entity
                    var expertProperty = typeof(Expert).GetProperty(property.Name);

                    // Check if the property is DateTime
                    if (expertProperty != null && expertProperty.PropertyType == typeof(DateTime))
                        
                    {
                        // Set the time to midnight (12:00 AM) if it's a DateTime property
                        var dateTimeValue = (DateTime)value;
                        expertProperty.SetValue(expert, dateTimeValue.Date.Add(new TimeSpan(0, 0, 0)));
                    }
                    else if(expertProperty != null && expertProperty.Name != "DisabilityAids" && expertProperty.Name != "Disabilities")
                    {
                        // For non-DateTime properties or properties to be excluded, update normally
                        expertProperty?.SetValue(expert, value);
                    }
                    
                }
            }


            expert.Disabilities.Clear(); // Clear existing disabilities

            foreach (var disabilityName in updatedUserData.Disabilities)
            {
                // Check if the disability already exists in the database
                var existingDisability = _context.Disabilities.FirstOrDefault(d => d.DisabilityName.Equals(disabilityName));

                if (existingDisability == null)
                {
                    return BadRequest($"Beperking '{disabilityName}' bestaat niet.");
                }
                else
                {
                    // Add the existing or newly created disability to the expert's disabilities
                    expert.Disabilities.Add(existingDisability);
                }
            }

            expert.DisabilityAids.Clear(); // Clear existing disabilityAids

            foreach (var disabilityAidName in updatedUserData.DisabilityAids)
            {
                // Check if the disability already exists in the database
                var existingDisabilityAid = _context.DisabilityAids.FirstOrDefault(d => d.DisabilityAidName.Equals(disabilityAidName));

                if (existingDisabilityAid == null)
                {
                    return BadRequest($"Beperking '{disabilityAidName}' bestaat niet.");
                }
                else
                {
                    // Add the existing or newly created disability to the expert's disabilities
                    expert.DisabilityAids.Add(existingDisabilityAid);
                }
            }

            // Save changes to the database
            _context.SaveChanges();

            // Return a success response
            return Ok("User data successfully updated.");
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
