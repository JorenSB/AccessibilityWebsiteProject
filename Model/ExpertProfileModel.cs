using Model.Users.Expert;

public class ExpertProfileModel
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime BirthDate { get; set; }
    public List<string> Disabilities { get; set; } = new List<string>();
    public List<string> DisabilityAids { get; set; } = new List<string>();
}
