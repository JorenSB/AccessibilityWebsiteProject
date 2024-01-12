using System.ComponentModel.DataAnnotations;

namespace Model.Users.Expert;
public class DisabilityAid
{
    [Key]
    public string DisabilityAidId {get; set;}
    public string DisabilityAidName {get; set;}
}