using Model.Users.Expert;
using System;
using System.Collections.Generic;

public class Expert : User
{
    // Extra eigenschappen die specifiek zijn voor de Expert-klasse
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public bool? EmailPreference { get; set; }
    public bool? PhonePreference { get; set; }
    public bool CommercialContact { get; set; }
    public DateTime BirthDate { get; set; }
    public Guardian? Guardian { get; set; }

    // Navigation properties for relationships
    public List<Disability> Disabilities { get; set; }
    public List<DisabilityAid> DisabilityAids { get; set; }
}

