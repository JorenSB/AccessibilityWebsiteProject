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

            // Actie
            var result = controller.GetUserData();

            // Verifiëren
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var userData = Assert.IsType<ExpertProfileModel>(okObjectResult.Value);

            // Specifieke beweringen toevoegen op basis van de verwachte gebruikersgegevens
            Assert.Equal("test@example.com", userData.Email);
            Assert.Equal("John", userData.FirstName);
            mockDbContext.Dispose();

        }


        [Fact]
        public async Task GetUser_WithNullHeader_ReturnsBadRequest()
        {
            // Arrange
            var mockDbContext = MockDbContextFactory.CreateMockContext();
            var mockValidationController = new MockValidationController();

            var controller = new DeskundigeController(mockDbContext, mockValidationController);

            // Create a ControllerContext with a null Authorization header
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

    }
}


