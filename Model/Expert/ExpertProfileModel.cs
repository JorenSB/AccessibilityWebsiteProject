public class ExpertProfileModel
{
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime BirthDate { get; set; }
    public bool CommercialContact {get;set;}
    public bool PhonePreference {get;set;}
    public bool EmailPreference {get;set;}
    public List<string> Disabilities { get; set; } = new List<string>();
    public List<string> DisabilityAids { get; set; } = new List<string>();
    public string? GuardianFirstName { get; set; }
    public DateTime? GuardianBirthDate { get; set; }
    public string? GuardianEmail { get; set; }
    public string? GuardianPhoneNumber { get; set; }
}
