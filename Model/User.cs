using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{    
    public bool Active {get;set;}
    
}