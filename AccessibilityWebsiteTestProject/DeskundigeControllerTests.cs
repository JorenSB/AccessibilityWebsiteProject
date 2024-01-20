namespace AccessibilityWebsiteTestProject
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Primitives;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;

    public class DeskundigeControllerTests
    {
        //getUser tests
        [Fact]
        public async Task GetUser_ReturnsOkResult()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();
            var controller = new DeskundigeController(mockDbContext, mockValidationController);
            var headerId = "2";

            // Een ControllerContext aanmaken met gesimuleerde headers
            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            // Headers toevoegen aan het verzoek (request)
            controllerContext.HttpContext.Request.Headers.Add("Authorization", headerId);

            controller.ControllerContext = controllerContext;

            // Act
            var result = controller.GetUserData();

            // Assert
            // Verifiëren
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var userData = Assert.IsType<ExpertProfileModel>(okObjectResult.Value);

            // Specifieke beweringen toevoegen op basis van de verwachte gebruikersgegevens
            Assert.Equal("test@example.com", userData.Email);
            Assert.Equal("John", userData.FirstName);

            // Cleanup
            mockDbContext.Dispose();
        }



        [Fact]
        public async Task GetUser_WithNullHeader_ReturnsBadRequest()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();

            var controller = new DeskundigeController(mockDbContext, mockValidationController);
            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            controller.ControllerContext = controllerContext;

            // Act
            var result = controller.GetUserData();

            // Assert
            Assert.IsType<BadRequestResult>(result);
            mockDbContext.Dispose();

        }




        //getDisabilities tests
        [Fact]
        public void GetDisabilityData_ReturnsOkResultWithDisabilities()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();
            var deskundigeController = new DeskundigeController(mockDbContext, mockValidationController);

            // Act
            var result = deskundigeController.GetDisabilityData();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var disabilities = Assert.IsType<List<string>>(okResult.Value);
            Assert.NotEmpty(disabilities);
            Assert.Equal(1, disabilities.Count);
            Assert.Equal("doof", disabilities.First());

            mockDbContext.Dispose();
        }

        [Fact]
        public void GetDisabilityData_ReturnsNotFoundResultWhenNoDisabilities()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();
            mockDbContext.MockDisabilities.RemoveRange(mockDbContext.MockDisabilities);
            mockDbContext.SaveChanges();
            var deskundigeController = new DeskundigeController(mockDbContext, mockValidationController);

            // Act
            var result = deskundigeController.GetDisabilityData();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("No disabilities found.", notFoundResult.Value);

            mockDbContext.Dispose();
        }



        //getDisabilityAids tests

        [Fact]
        public void GetDisabilityAidData_ReturnsOkResultWithDisabilityaids()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();
            var deskundigeController = new DeskundigeController(mockDbContext, mockValidationController);

            // Act
            var result = deskundigeController.GetDisabilityAidsData();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var disabilityAids = Assert.IsType<List<string>>(okResult.Value);
            Assert.NotEmpty(disabilityAids);
            Assert.Equal(1, disabilityAids.Count);
            Assert.Equal("gehoor apparaat", disabilityAids.First());

            mockDbContext.Dispose();
        }

        [Fact]
        public void GetDisabilityAidData_ReturnsNotFoundResultWhenNoDisabilityAids()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();
            mockDbContext.MockDisabilityAids.RemoveRange(mockDbContext.MockDisabilityAids);
            mockDbContext.SaveChanges();
            var deskundigeController = new DeskundigeController(mockDbContext, mockValidationController);

            // Act
            var result = deskundigeController.GetDisabilityAidsData();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("No disability aids found.", notFoundResult.Value);

            mockDbContext.Dispose();
        }

        [Fact]
        public async Task UpdateUserData_ReturnsOkResult()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();
            var deskundigeController = new DeskundigeController(mockDbContext, mockValidationController);

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };
            controllerContext.HttpContext.Request.Headers.Add("Authorization", "2");
            deskundigeController.ControllerContext = controllerContext;

            var updatedUserData = new UpdatedExpertProfileModel
            {
                FirstName = "UpdatedFirstName",
            };

            // Act
            var result = deskundigeController.UpdateUserData(updatedUserData);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User data successfully updated.", okResult.Value);

            var updatedExpert = mockDbContext.MockExperts.Find("2");
            Assert.Equal("UpdatedFirstName", updatedExpert.FirstName);

            mockDbContext.Dispose();
        }

        [Fact]
        public async Task UpdateUserData_WithInvalidToken_ReturnsBadRequest()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();
            var deskundigeController = new DeskundigeController(mockDbContext, mockValidationController);

            // Create a ControllerContext with an invalid Authorization header (null token)
            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };
            deskundigeController.ControllerContext = controllerContext;

            var updatedUserData = new UpdatedExpertProfileModel
            {
                // Provide values for the properties you want to update
                FirstName = "UpdatedFirstName",
                // Add other properties as needed
            };

            // Act
            var result = deskundigeController.UpdateUserData(updatedUserData);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;
            Assert.Equal("Token is invalid.", badRequestResult.Value);

            mockDbContext.Dispose();
        }

    }
}


