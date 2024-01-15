public class StudyViewModel
{
    public string Title { get; set; }
    public string Status { get; set; }
    public double Reward { get; set; }
    public string Language { get; set; }
    public string Beperking { get; set; }
    public DateTime Date { get; set; }
    public ResultModelView? Result { get; set; }
}