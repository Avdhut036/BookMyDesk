using BMDApplication.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly BMDDbContext _context;
        public RoleController(BMDDbContext context) {
            _context = context;
        }

       
        [HttpGet]
        public IActionResult Getby() {
            Console.WriteLine("in getby");
            try
            {
                var roles = _context.Roles.ToList();
                if (roles == null)
                {
                    return NotFound("Roles not found");
                }return Ok(roles);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);                
            }
        }
        [HttpGet]
        [Route("getbb")]
        public IActionResult Getb()
        {
            Console.WriteLine("in getb");
            try
            {
                var roles = _context.Roles.ToList();
                if (roles == null)
                {
                    return NotFound("Roles not found");
                }
                return Ok(roles);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
