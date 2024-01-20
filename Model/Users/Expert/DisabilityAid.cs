using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Users.Expert;
public class DisabilityAid
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int DisabilityAidId { get; set; }
    public string DisabilityAidName { get; set; }
}