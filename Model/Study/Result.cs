using System.ComponentModel.DataAnnotations;

public class Result {
    [Key]
    public int ResultID {get; set;}
    public int Score { get; set; }
    public string Feedback { get; set; }
}