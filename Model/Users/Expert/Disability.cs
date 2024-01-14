using System.ComponentModel.DataAnnotations;

namespace Model.Users.Expert;
public class Disability
{
    [Key]
    public string DisabilityId {get; set;}
    public string DisabilityName {get; set;}
}