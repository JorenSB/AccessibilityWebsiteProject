public class ResultModelView
{
    public int Score { get; set; }
    public string Feedback { get; set; }
    public ResultModelView()
    {

    }
    public ResultModelView(Result result)
    {
        Score = result.Score;
        Feedback = result.Feedback;
    }
}