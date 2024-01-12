
using Model.Users.Expert;

public class Expert : User
{
    // Extra eigenschappen die specifiek zijn voor de Expert-klasse
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string ContactPreferences { get; set; }
    public bool CommercialContact { get; set; }
    public DateTime BrithDate { get; set; }
    public bool ProfileComplete { get; set; }

    public Guardian? guardian { get; set; }
    public List<Disability> Disabilities = new();
    public List<DisabilityAid> DisabilityAids = new();
}