using System.Text.RegularExpressions;

public class ValidationController
{
    public static bool IsValidEmail(string email)
    {
        string emailPattern = @"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

        return Regex.IsMatch(email, emailPattern);
    }

    public static bool IsValidPassword(string password){

        if (password.Length < 8)
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

    
}