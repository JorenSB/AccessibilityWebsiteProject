using Model.Users.Expert;

public class Expert : User
{
    // Extra eigenschappen die specifiek zijn voor de Expert-klasse
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool EmailPreference { get; set; }
    public bool PhonePreference { get; set; }
    public bool CommercialContact { get; set; }
    public DateTime BirthDate { get; set; }
    public bool ProfileComplete { get; set; }
    public List<Disability> Disabilities { get; set; }
    public List<DisabilityAid> DisabilityAids { get; set; }
    public string? GuardianFirstName { get; set; }
    public string? GuardianLastName { get; set; }
    public string? GuardianEmail { get; set; }
    public string? GuardianPhoneNumber { get; set; }
}