using System.ComponentModel.DataAnnotations;

public class RegisterCompanyViewModel
{
    [Required(ErrorMessage = "BedrijfsNaam is verplicht")]
    public string CompanyName { get; set; }

    [Required(ErrorMessage = "Email is verplicht")]
    [EmailAddress(ErrorMessage = "Ongeldig e-mailadres")]
    public string Email { get; set; }

     [Required(ErrorMessage = "KvK-nummer is verplicht")]
    public string KVK { get; set; }

    [Required(ErrorMessage = "Wachtwoord is verplicht")]
    [DataType(DataType.Password)]
    public string Password { get; set; }
   
}
