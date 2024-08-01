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
        public RoleController(BMDDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult getAllRoles()
        {
            Console.WriteLine("in getby");
            try
            {
                var roles = _context.roles.ToList();
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
