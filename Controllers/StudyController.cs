using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccessibilityWebsiteProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        [HttpGet("GetStudies")]
        public async Task<ActionResult<IEnumerable<Study>>> GetStudies()
        {
            if (_context.Studies == null)
            {
                return BadRequest("No studies found");
            }
            return await _context.Studies.ToListAsync();
        }

        // GET: api/Study/MyStudies
        [HttpGet("GetMyStudies")]
        public async Task<ActionResult<IEnumerable<StudyViewModel>>> GetMyStudies()
        {
            var JWTToken = Request.Headers["JWTToken"].FirstOrDefault();

            var idClaim = _validationController.getIdentifierFromJWT(JWTToken!);

            if (string.IsNullOrEmpty(idClaim))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            IEnumerable<Study> matchingStudies = await _context.Studies
                .Where(s => s.CompanyID == idClaim)
                .ToListAsync();

            if (!matchingStudies.Any())
            {
                return BadRequest("No studies found from your company");
            }

            var studies = new List<StudyViewModel>();

            foreach (Study study in matchingStudies)
            {
                if (study.Result != null)
                {
                    study.Result = _context.Results.First(x => x.StudyID == study.StudyID);
                }
                studies.Add(new StudyViewModel(study));
            }

            return Ok(studies);
        }


        // GET: api/Study/5
        [HttpGet("GetStudy")]
        public async Task<ActionResult<StudyViewModel>> GetStudy(int id)
        {
            if (_context.Studies == null)
            {
                return BadRequest();
            }
            var study = await _context.Studies.FindAsync(id);

            if (study == null)
            {
                return BadRequest();
            }
            study.Result = _context.Results.First(x => x.StudyID == id); // Bit hacky but it works <3 -W

            return Ok(new StudyViewModel(study));
        }

        // PUT: api/Study/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateStudy")]
        public async Task<IActionResult> UpdateStudy(int id, StudyViewModel studyViewModel)
        {
            var JWTToken = Request.Headers["JWTToken"].FirstOrDefault();

            var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken!);

            if (string.IsNullOrEmpty(userIdFromToken))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            if (_context.Studies == null)
            {
                return BadRequest();
            }

            var study = await _context.Studies.FindAsync(id);

            if (study == null)
            {
                return BadRequest();
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
                    return BadRequest();
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
        [HttpPost("AddStudy")]
        public async Task<ActionResult<Study>> AddStudy(StudyViewModel studyViewModel)
        {
            var JWTToken = Request.Headers["JWTToken"].FirstOrDefault();

            var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken!);

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

            return CreatedAtAction("Created successfully", study);
        }

        // DELETE: api/Study/5
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteStudy(int id)
        {
            var JWTToken = Request.Headers["JWTToken"].FirstOrDefault();

            var userIdFromToken = _validationController.getIdentifierFromJWT(JWTToken!);

            if (string.IsNullOrEmpty(userIdFromToken))
            {
                return BadRequest("Invalid or missing ID claim in the token");
            }

            // Check if the study with the given ID exists
            var study = await _context.Studies.FindAsync(id);
            if (study == null)
            {
                return BadRequest("Study not found");
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
