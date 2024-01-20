namespace AccessibilityWebsiteTestProject;

public class ValidationControllerTests
{
       private readonly ValidationController _validationController;

    public ValidationControllerTests (ValidationController validationController)
    {
        _validationController = validationController;
    }

    [Fact]
    public void IsValidEmail_ShouldReturnTrueForValidEmail()
    {
        // Arrange
        string validEmail = "test@example.com";

        // Act
        bool result = _validationController.IsValidEmail(validEmail);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void IsValidEmail_ShouldReturnFalseForInvalidEmail()
    {
        // Arrange
        string invalidEmail = "invalid_email";

        // Act
        bool result = _validationController.IsValidEmail(invalidEmail);

        // Assert
        Assert.False(result);
    }

    [Fact]
    public void IsValidEmail_ShouldReturnFalseForNullOrEmptyEmail()
    {
        // Arrange
        string nullOrEmptyEmail = null;
        string emptyEmail = string.Empty;

        // Act
        bool resultNullOrEmpty = _validationController.IsValidEmail(nullOrEmptyEmail);
        bool resultEmpty = _validationController.IsValidEmail(emptyEmail);

        // Assert
        Assert.False(resultNullOrEmpty);
        Assert.False(resultEmpty);
    }
}
