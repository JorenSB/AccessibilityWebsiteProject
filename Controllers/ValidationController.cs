using System.Text.RegularExpressions;
using Microsoft.IdentityModel.Tokens;

public class ValidationController
{
    public static bool IsValidEmail(string? email)
    {
        // Checks if the email is empty or null
        if (email.IsNullOrEmpty()) 
        {
            return false;
        }
        // The regex pattern to match the email against
        string emailPattern = @"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        return Regex.IsMatch(email, emailPattern);
    }

    public static bool IsValidPassword(string? password){
        // Checks if the password is empty or null
        if (password.IsNullOrEmpty())
        {
            return false;
        }
        // Checks if the password is at least 8 characters long
        if (password.Length < 8)
        {
            return false;
        }
        // Checks if the password contains a capital letter
        if (!Regex.IsMatch(password, @"[A-Z]"))
        {
            return false;
        }
        // Checks if password contains a special character
        if (!Regex.IsMatch(password, @"[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]"))
        {
            return false;
        }
        return true;
    }
}