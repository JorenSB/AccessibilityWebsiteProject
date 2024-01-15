public class Company : User
{
    // Extra eigenschappen die specifiek zijn voor de Company-klasse
    public string? Information { get; set; }

    public required string CompanyName {get; set;}
    public string? Url { get; set; }
    public required string KvkNumber { get; set; }
}