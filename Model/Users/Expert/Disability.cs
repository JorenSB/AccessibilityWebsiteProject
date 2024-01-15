using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Users.Expert;
public class Disability
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string DisabilityId { get; set; }
    public string DisabilityName { get; set; }
}