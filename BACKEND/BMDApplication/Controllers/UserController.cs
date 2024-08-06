using BMDApplication.Models;
using BMDApplication.Models.DTOs;
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
        private readonly IBookingService _bookingService;

        public UserController(IUserService userService, IBookingService bookingService)
        {
            _userService = userService;
            _bookingService = bookingService;
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

        [HttpPost("createUser")]
        public IActionResult createUser([FromBody] UserWithBookingDTO userWithBookingDTO)
        {
            Console.WriteLine("in createUser controller:" + userWithBookingDTO);
            if (userWithBookingDTO == null)
            {
                return BadRequest();
            }
            User user = new User
            {
                firstName = userWithBookingDTO.fName,
                lastName = userWithBookingDTO.lName,
                emailId = userWithBookingDTO.emailId,
                password = userWithBookingDTO.password,
                roleId = userWithBookingDTO.role,
                roleFrequency = userWithBookingDTO.frequency,
                phoneNo = userWithBookingDTO.phoneNo
            };


            var userId = _userService.createUser(user);
            Console.WriteLine("userId:" + userId);


            Booking booking = new Booking
            {
                bookedBy = userId,
                bookedSeatNo = userWithBookingDTO.seatId,
                bookedFloorNo = userWithBookingDTO.floor,
                bookedFor = userId,
                updateDate = DateTime.Now,
                bookedDate= DateTime.Now
            };
        

            _bookingService.createBooking(booking);

            return CreatedAtAction(nameof(createUser), new { id = userId }, userId);

        }
    }
}
