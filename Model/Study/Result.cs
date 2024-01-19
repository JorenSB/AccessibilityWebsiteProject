using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Result
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ResultID { get; set; }
    public int? StudyID { get; set; }
    public Study Study { get; set; }
    public int Score { get; set; }
    public string Feedback { get; set; }

    public Result()
    {

    }

    public Result(ResultModelView resultModelView)
    {
        Score = resultModelView.Score;
        Feedback = resultModelView.Feedback;
    }
}