public class StudyViewModel
{
    public int StudyID { get; set; }
    public string Title { get; set; }
    public string Status { get; set; }
    public double Reward { get; set; }
    public string Language { get; set; }
    public string Beperking { get; set; }
    public DateTime Date { get; set; }
    public ResultModelView? Result { get; set; }
    public StudyViewModel()
    {

    }
    public StudyViewModel(Study study)
    {
        StudyID = study.StudyID;
        Title = study.Title;
        Status = study.Status;
        Reward = study.Reward;
        Language = study.Language;
        Beperking = study.Beperking;
        Date = study.Date;
        if (study.Result != null)
            Result = new ResultModelView(study.Result);
    }
}