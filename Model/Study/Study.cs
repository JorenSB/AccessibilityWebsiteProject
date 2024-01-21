using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Study
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int StudyID { get; set; }
    public string CompanyID { get; set; }
    public string Title { get; set; }
    public string Status { get; set; }
    public double Reward { get; set; }
    public string Language { get; set; }
    public string Beperking { get; set; }
    public DateTime Date { get; set; }
    public Result? Result { get; set; }

    public Study()
    {

    }

    public Study(string CompanyID, StudyViewModel studyViewModel) 
    {
        this.CompanyID = CompanyID;
        InitializeFromViewModel(studyViewModel);
    }
    public Study(int id, StudyViewModel studyViewModel)
    {
        StudyID = id;
        InitializeFromViewModel(studyViewModel);
    }

    public Study(StudyViewModel studyViewModel)
    {
        InitializeFromViewModel(studyViewModel);
    }

    private void InitializeFromViewModel(StudyViewModel studyViewModel)
    {
        Title = studyViewModel.Title;
        Status = studyViewModel.Status;
        Reward = studyViewModel.Reward;
        Language = studyViewModel.Language;
        Beperking = studyViewModel.Beperking;
        Date = studyViewModel.Date;
        if (studyViewModel.Result != null)
        {
            Result = new Result(studyViewModel.Result);
        }
    }
}