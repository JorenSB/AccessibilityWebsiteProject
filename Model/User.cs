using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    // Extra eigenschappen die specifiek zijn voor de User-klasse
    public string rol { get; set; }
}