using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccessibilityWebsiteProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ValidationController _validationController;

        public StudyController(ApplicationDbContext context, ValidationController validationController)
        {
            _context = context;
            _validationController = validationController;

        }

        // GET: api/Study
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Study>>> GetStudies()
        {
            if (_context.Studies == null)
            {
                return NotFound("No studies found");
            }
            return await _context.Studies.ToListAsync();
        }

        // GET: api/Study/MyStudies
        [HttpGet("MyStudies")]
        public async Task<ActionResult<IEnumerable<Study>>> GetMyStudies(string JWTToken)
        {
            var idClaim = _validationController.getIdentifierFromJWT(JWTToken);

            if (string.IsNullOrEmpty(idClaim))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            var matchingStudies = await _context.Studies
                .Where(s => s.CompanyID == idClaim)
                .ToListAsync();

            if (matchingStudies.Count == 0)
            {
                return NotFound("No studies found from your company");
            }

            return matchingStudies;
        }

        // GET: api/Study/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Study>> GetStudy(int id)
        {
            if (_context.Studies == null)
            {
                return NotFound();
            }
            var study = await _context.Studies.FindAsync(id);

            if (study == null)
            {
                return NotFound();
            }

            return study;
        }

        // PUT: api/Study/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> UpdateStudy(int id, StudyViewModel studyViewModel, string JWTToken)
        {
            var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken);

            if (string.IsNullOrEmpty(userIdFromToken))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            if (_context.Studies == null)
            {
                return NotFound();
            }

            var study = await _context.Studies.FindAsync(id);

            if (study == null)
            {
                return NotFound();
            }

            if (study.CompanyID != userIdFromToken)
            {
                return BadRequest("You do not have access to edit this");
            }

            Study newStudy = new Study(studyViewModel);

            _context.Entry(newStudy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/Study
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Study>> AddStudy(StudyViewModel studyViewModel, string JWTToken)
        {
            var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken);

            if (string.IsNullOrEmpty(userIdFromToken))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            if (_context.Studies == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Studies'  is null.");
            }

            string CompanyID = _context.Companies.Where(u => u.Id == userIdFromToken).First().Id;

            Study study = new Study(CompanyID, studyViewModel);

            _context.Studies.Add(study);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudy", new { id = study.StudyID }, study);
        }

        // DELETE: api/Study/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudy(int id, string JWTToken)
        {
            var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken);

            if (string.IsNullOrEmpty(userIdFromToken))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            // Check if the study with the given ID exists
            var study = await _context.Studies.FindAsync(id);
            if (study == null)
            {
                return NotFound("Study not found");
            }

            // Check if the user ID in the token matches the user ID associated with the study
            if (study.CompanyID != userIdFromToken)
            {
                return Forbid("You do not have permission to delete this study");
            }

            _context.Studies.Remove(study);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool StudyExists(int id)
        {
            return (_context.Studies?.Any(e => e.StudyID == id)).GetValueOrDefault();
        }
    }
}
