using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Users.Expert;

[ApiController]
[Route("api/deskundige")]
public class DeskundigeController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ValidationController _validationController;
    public DeskundigeController(ApplicationDbContext context, ValidationController validationController)
    {
        _context = context;
        _validationController = validationController;
    }

    [HttpGet("getuser")]
    public IActionResult GetUserData()
    {
        try
        {
            var userId = _validationController.getIdentifierFromJWT(Request.Headers["Authorization"].FirstOrDefault());

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest();
            }

            Expert? expert = _context.Experts
                .Include(e => e.Disabilities)
                .Include(e => e.DisabilityAids)
                .FirstOrDefault(c => c.Id == userId);

            if (expert == null)
            {
                return NotFound($"Expert with ID {userId} not found.");
            }
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
                EmailPreference = expert.EmailPreference,
                GuardianFirstName = expert.GuardianFirstName,
                GuardianBirthDate = expert.GuardianBirthDate,
                GuardianEmail = expert.GuardianEmail,
                GuardianPhoneNumber = expert.GuardianPhoneNumber


            };
            return Ok(userData);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }



    [HttpPut("updateuser")]
    public IActionResult UpdateUserData([FromBody] UpdatedExpertProfileModel updatedUserData)
    {
        try
        {
            var userId = _validationController.getIdentifierFromJWT(Request.Headers["Authorization"].FirstOrDefault());

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Token is invalid.");
            }
            Expert? expert = _context.Experts
                .Include(e => e.Disabilities)
                .Include(e => e.DisabilityAids)
                .FirstOrDefault(c => c.Id == userId);

            if (expert == null)
            {
                return NotFound($"Expert with ID {userId} not found.");
            }

            // Use reflection to iterate through the properties of UpdatedExpertProfileModel
            foreach (var property in typeof(UpdatedExpertProfileModel).GetProperties())
            {
                // Check if the property has a value
                var value = property.GetValue(updatedUserData);

                if (value != null)
                {
                    // Check if the property is the password
                    // if (property.Name == "Password")
                    // {
                    //     // Hash and set the password
                    //     var hashedPassword = _userManager.PasswordHasher.HashPassword(expert, value.ToString());
                    //     expert.PasswordHash = hashedPassword;
                    // }
                    // else
                    //{
                        // Update the corresponding property in the Expert entity
                        var expertProperty = typeof(Expert).GetProperty(property.Name);

                        // Check if the property is DateTime
                        if (expertProperty != null && expertProperty.PropertyType == typeof(DateTime))
                        {
                            var dateTimeValue = (DateTime)value;
                            expertProperty.SetValue(expert, dateTimeValue.Date.Add(new TimeSpan(0, 0, 0)));
                        }
                        else if (expertProperty != null && expertProperty.Name != "DisabilityAids" && expertProperty.Name != "Disabilities")
                        {
                            expertProperty?.SetValue(expert, value);
                        }
                    //}
                }
            }


            expert.Disabilities.Clear();

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

            expert.DisabilityAids.Clear();

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

            _context.SaveChanges();

            return Ok("User data successfully updated.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [HttpGet("getdisabilities")]
    public IActionResult GetDisabilityData()
    {
        try
        {
            var disabilities = _context.Disabilities.Select(d => d.DisabilityName).Distinct().ToList();
            if (disabilities == null || disabilities.Count == 0)
            {
                return NotFound("No disabilities found.");
            }

            return Ok(disabilities);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while fetching disabilities data.");
        }
    }

    [HttpGet("getdisabilityAids")]
    public IActionResult GetDisabilityAidsData()
    {
        try
        {
            var disabilityAids = _context.DisabilityAids.Select(d => d.DisabilityAidName).Distinct().ToList();

            if (disabilityAids == null || disabilityAids.Count == 0)
            {
                return NotFound("No disability aids found.");
            }

            return Ok(disabilityAids);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while fetching disability aids data.");
        }
    }
}
