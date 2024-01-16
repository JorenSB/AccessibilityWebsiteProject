public class CompanyViewModel
{
    public string? Information { get; set; }
    public string? CompanyName { get; set; }
    public string? CurrentPassword { get; set; }
    public string? NewPassword { get; set; }
    public string? Email { get; set; }
    public string? Url { get; set; }
    public int? KvkNumber { get; set; }
    public string? Address { get; set; }
    public CompanyViewModel()
    {

    }
    public CompanyViewModel(Company company) 
    {
        Information = company.Information;
        CompanyName = company.CompanyName;
        Email = company.Email;
        Url = company.Url;
        KvkNumber = company.KvkNumber;
        Address = company.Address;
    }
}