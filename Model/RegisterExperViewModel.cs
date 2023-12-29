using System.ComponentModel.DataAnnotations;

public class RegisterExpertViewModel
{
    [Required(ErrorMessage = "Het veld 'Gebruikersnaam' is verplicht.")]
    [EmailAddress(ErrorMessage = "Het veld 'Gebruikersnaam' moet een geldig e-mailadres zijn.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Het veld 'Wachtwoord' is verplicht.")]
    [DataType(DataType.Password)]
    [StringLength(100, ErrorMessage = "Het wachtwoord moet ten minste {2} en maximaal {1} tekens lang zijn.", MinimumLength = 6)]
    public string Password { get; set; }

    [Required(ErrorMessage = "het veld 'voornaam' is verplicht")]
    public string FirstName {get; set; }

    [Required(ErrorMessage = "het veld 'achternaam' is verplicht")]
    public string LastName {get; set;}
}