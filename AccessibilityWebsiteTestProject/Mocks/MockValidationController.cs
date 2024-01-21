
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;

public class MockValidationController : ValidationController
{
 
    public override string? getIdentifierFromJWT(string jwt)
    {
        if (!string.IsNullOrEmpty(jwt))
        {
            try
            {
                return "2";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return null;
            }
        }

        return null;
    }
}