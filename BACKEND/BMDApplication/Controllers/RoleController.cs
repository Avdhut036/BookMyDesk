// Controllers/RoleController.cs
using Microsoft.AspNetCore.Mvc;
using BMDApplication.Services.Interfaces;
using BMDApplication.Models;


namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public ActionResult<List<Role>> getAllRoles()
        {
            var roles = _roleService.getAllRoles();
            if (roles == null || roles.Count == 0)
            {
                return NotFound("No roles found.");
            }
            return Ok(roles);
        }
    }
}
