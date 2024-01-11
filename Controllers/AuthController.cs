    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;

    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(model.Username);

                var roles = await _userManager.GetRolesAsync(user);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, string.Join(",", roles))
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SECRET_KEY")));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: HttpContext.Request.Scheme + "://" + HttpContext.Request.Host,
                    audience: HttpContext.Request.Scheme + "://" + HttpContext.Request.Host,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: creds
                );

                var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(new { Message = "Login successful", Token = jwtToken });
            }
            else
            {
                return BadRequest(new { Message = "Login failed" });
            }
        }

        [HttpPost("registerExpert")]
        public async Task<IActionResult> RegisterExpert([FromBody] RegisterExpertViewModel model)
        {
            var expert = new Expert
            {
                Email = model.Email,
                EmailConfirmed = true,
                UserName = model.Email,
                FirstName = model.FirstName, 
                LastName = model.LastName
            };
            

            var result = await _userManager.CreateAsync(expert, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(expert, "Expert");

                return Ok("Expert geregistreerd");
            }

            return BadRequest("Er is iets misgegaan bij de registratie van de expert");
        }




        [HttpPost("registerCompany")]
    public async Task<IActionResult> RegisterCompany([FromBody] RegisterCompanyViewModel model)
    {
        var company = new Company
        {
            Email = model.Email,
            UserName = model.Email,
            CompanyName = model.CompanyName,
            EmailConfirmed = true,
            KvkNumber = model.KVK
        };

        var result = await _userManager.CreateAsync(company, model.Password);

        if (result.Succeeded)
        {
            // Geef de rol "Bedrijf" aan de nieuwe gebruiker
            await _userManager.AddToRoleAsync(company, "Bedrijf");

            return Ok("Bedrijf geregistreerd");
        }

        return BadRequest("Er is iets misgegaan bij de registratie van het bedrijf");
    }

    }