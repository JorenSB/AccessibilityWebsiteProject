using System.ComponentModel.DataAnnotations;

namespace Model.Users.Expert;
public class Guardian
{
    [Key]
    public string GuardianId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

}