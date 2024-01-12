// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;

// [ApiController]
// [Route("api/test-endpoint")]
// public class testController : ControllerBase
// {
//     [HttpGet]
//     [Authorize(Roles = "Expert")] 
//     public IActionResult GetSecureData()
//     {
//         // Voeg hier je beveiligde logica toe
//         return Ok(new { Message = "Secure data retrieved successfully" });
//     }
// }
