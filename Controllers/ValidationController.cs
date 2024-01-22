using System.Text.RegularExpressions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;

public class ValidationController
{
    public bool IsValidEmail(string? email)
    {
        if (email.IsNullOrEmpty())
        {
            return false;
        }
        string emailPattern = @"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        return Regex.IsMatch(email!, emailPattern);
    }

    public bool IsValidPassword(string? password)
    {
        if (password.IsNullOrEmpty())
        {
            return false;
        }
        if (password!.Length < 8)
        {
            return false;
        }
        if (!Regex.IsMatch(password, @"[A-Z]"))
        {
            return false;
        }
        if (!Regex.IsMatch(password, @"[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]"))
        {
            return false;
        }
        return true;
    }


    public virtual string? getIdentifierFromJWT(string JWTToken)
    {
        if (JWTToken.IsNullOrEmpty())
        {
            return null;
        }

        DotNetEnv.Env.Load();
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

        try
        {
            // Validate the token
            var claimsPrincipal = handler.ValidateToken(JWTToken, validations, out var tokenSecure);

            if (claimsPrincipal != null)
            {
                // Access the user's ID claim
                var idClaim = claimsPrincipal.Identities.FirstOrDefault()?.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(idClaim))
                {
                    return null;
                }
                return idClaim;
            }
            else
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            Console.WriteLine($"Stack Trace: {ex.StackTrace}");
            return null;
        }
    }

    public bool authAdmin(string? tokenJWT) {
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
}