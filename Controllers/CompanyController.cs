using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly ValidationController _validationController;

    public CompanyController(UserManager<User> userManager, ApplicationDbContext dbContext, ValidationController validationController)
    {
        _userManager = userManager;
        _context = dbContext;
        _validationController = validationController;
    }

    // <summary>Gets the data from the Company Based on the JWTToken.</summary>
    // <param name="JWTToken">The token obtained on successful login.</param>
    // <returns>Returns the Company's data encapsulated in a CompanyViewModel for security purposes as a JSON.</returns>
    [HttpGet("GetCompany")]
    public IActionResult GetCompanyData()
    {
        var JWTToken = Request.Headers["JWTToken"].FirstOrDefault();
        //Gets the UserID from the databsae from the JWTToken
        var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken!);

        // Checks if a valid token has been found
        if (userIdFromToken == null)
        {
            return BadRequest("Invalid token");
        }

        // Gets the Company object from the UserID
        var company = _context.Companies.FirstOrDefault(c => c.Id == userIdFromToken);

        // Checks if a Company has been found
        if (company != null)
        {
            // Returns the information the user should be able to see through a CompanyViewModel
            return Ok(new CompanyViewModel(company));
        }
        // Returns if no Company has been found
        return BadRequest("Company not found");
    }

    // <summary>Updates the given information if it meets the requirements.</summary>
    // <param name="JWTToken">The token obtained on successful login.</param>
    // <param name="companyViewModel">A limited version of the Company class so only certain properties can be changed.</param>
    // <returns>Returns a HTTP status code with an error/success message.</returns>
    [HttpPut("UpdateCompany")]
    public async Task<IActionResult> UpdateCompany(CompanyViewModel? companyViewModel)
    {
        var JWTToken = Request.Headers["JWTToken"].FirstOrDefault();


        if (companyViewModel == null)
        {
            // Returns nothing if no data is provided
            return NoContent();
        }

        // Gets the UserID from the database from the JWTToken
        var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken!);

        // Checks if a valid token has been found
        if (userIdFromToken == null)
        {
            return BadRequest("Invalid token");
        }

        // Gets the Company object from the UserID
        var company = _context.Companies.FirstOrDefault(c => c.Id == userIdFromToken);

        // Checks if a Company has been found
        if (company == null)
        {
            return BadRequest("Company not found");
        }

        // Checks if the Information field was filled in and modified
        if (companyViewModel.Information != null && company.Information != companyViewModel.Information)
        {
            // Checks if an empty string was provided
            if (companyViewModel.Information.Equals(""))
            {
                // Updates the Information field to null
                company.Information = null;
            }
            else
            {
                // Updates the Information field
                company.Information = companyViewModel.Information;
            }
        }
        // Checks if the CompanyName field was filled in and modified
        if (companyViewModel.CompanyName != null && company.CompanyName != companyViewModel.CompanyName)
        {
            // Updates the CompanyName field
            company.CompanyName = companyViewModel.CompanyName;
        }

        // Checks if the Email field was filled in and modified
        if (companyViewModel.Email != null && company.Email != companyViewModel.Email)
        {
            // Checks if the Email meets the requirements
            if (_validationController.IsValidEmail(companyViewModel.Email))
            {
                // Checks if any user already is using the given Email
                var existingUser = await _userManager.FindByEmailAsync(companyViewModel.Email!);
                if (existingUser != null)
                {
                    // Returns if the email is already in use
                    return BadRequest(new { Message = "Email already in use." });
                }
                // Updates the Fields 
                company.Email = companyViewModel.Email;
                company.NormalizedEmail = companyViewModel.Email!.ToUpper();
                company.UserName = companyViewModel.Email;
                company.NormalizedUserName = companyViewModel.Email.ToUpper();
            }
            else
            {
                // Returns if email doesnt meet requirements
                return BadRequest("Email does not meet requirements.");
            }
        }

        // Checks if the Password field was filled in
        if (companyViewModel.NewPassword != null)
        {
            // Checks if NewPassword meets requirements
            if (_validationController.IsValidPassword(companyViewModel.NewPassword))
            {
                // Checks if the CurrentPassword is filled in
                if (companyViewModel.CurrentPassword != null)
                {
                    // Tries to change the password
                    await _userManager.ChangePasswordAsync(company, companyViewModel.CurrentPassword, companyViewModel.NewPassword);
                }
                else
                {
                    // Returns if the CurrentPassword is not filled in
                    return BadRequest("New and current password are required to change password.");
                }
            }
            else
            {
                // Returns if the NewPassword doesnt meet the requirements
                return BadRequest("Password does not meet requirements.");
            }
        }

        // Checks if the Url field was filled in and modified
        if (companyViewModel.Url != null && company.Url != companyViewModel.Url)
        {
            // Checks if an empty string was provided
            if (companyViewModel.Url.Equals(""))
            {
                // Updates the Url field to null
                company.Url = null;
            }
            else
            {
                // Updates the Url field to filled in value
                company.Url = companyViewModel.Url;
            }
        }

        // Checks if the KvkNumber field was filled in
        if (companyViewModel.KvkNumber.HasValue)
        {
            // Updates the KnkNumber field
            company.KvkNumber = companyViewModel.KvkNumber.Value;
        }

        // Checks if the Address field was filled in and modified
        if (companyViewModel.Address != null && company.Address != companyViewModel.Address)
        {
            // Updates the Address field
            company.Address = companyViewModel.Address;
        }

        // Tries to update the company and save it to the database
        try
        {
            _context.Companies.Update(company);
            await _context.SaveChangesAsync();
            return Ok("Company successfully updated.");
        }
        catch (Exception)
        {
            return BadRequest("Company failed to update.");
        }
    }
}