using BMDApplication.Models;
using BMDApplication.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> getAllUsers()
        {
            var users = _userService.getAllUsers();
            return Ok(users);
        }

        [HttpGet("employeetable")]
        public ActionResult<IEnumerable<User>> getEmployeeTable()
        {
            var employees = _userService.getEmployeeTable();
            return Ok(employees);
        }
    }
}
