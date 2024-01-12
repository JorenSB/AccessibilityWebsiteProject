public class Company : User
{
    // Extra eigenschappen die specifiek zijn voor de Company-klasse
    public string? Information { get; set; }

    public string CompanyName {get; set;}
    public string? Url { get; set; }
    public string KvkNumber { get; set; }
    public Address? Address { get; set; }
}