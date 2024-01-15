using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Users.Expert;
public class Guardian
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string GuardianId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}