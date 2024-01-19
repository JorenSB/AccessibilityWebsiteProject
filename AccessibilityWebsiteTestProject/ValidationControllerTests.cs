namespace AccessibilityWebsiteTestProject;

public class ValidationControllerTests
{
    [Fact]
    public void IsValidEmail_ShouldReturnTrueForValidEmail()
    {
        // Arrange
        string validEmail = "test@example.com";

        // Act
        bool result = ValidationController.IsValidEmail(validEmail);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public void IsValidEmail_ShouldReturnFalseForInvalidEmail()
    {
        // Arrange
        string invalidEmail = "invalid_email";

        // Act
        bool result = ValidationController.IsValidEmail(invalidEmail);

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
        bool resultNullOrEmpty = ValidationController.IsValidEmail(nullOrEmptyEmail);
        bool resultEmpty = ValidationController.IsValidEmail(emptyEmail);

        // Assert
        Assert.False(resultNullOrEmpty);
        Assert.False(resultEmpty);
    }
}
