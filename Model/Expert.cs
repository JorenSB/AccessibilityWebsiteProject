public class Expert : User {
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string contactPreference { get; set; }
    public bool canContactForCommercialPurposes { get; set; }
    public DateTime birthday { get; set; }
    public bool profileComplete { get; set; }
}