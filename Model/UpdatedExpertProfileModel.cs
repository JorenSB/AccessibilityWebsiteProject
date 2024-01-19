using Model.Users.Expert;

public class UpdatedExpertProfileModel
{
    public string? Email { get; set; }
    public string? Password{get;set;}
    public string? FirstName { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime? BirthDate { get; set; }
    public bool CommercialContact {get;set;}
    public bool PhonePreference {get;set;}
    public bool EmailPreference {get;set;}
    public List<string> Disabilities { get; set; } = new List<string>();
    public List<string> DisabilityAids { get; set; } = new List<string>();
}
