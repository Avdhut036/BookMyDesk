
using BMDApplication.Data;
using Microsoft.AspNetCore.Mvc;
using BMDApplication.Models;
namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly BMDDbContext _context;
        public SeatController(BMDDbContext context)
        {
            _context = context;
        }
        [HttpGet("{floorNo}")]
        public IActionResult getSeatByFloorNo(int floorNo)
        {
            try
            {
                var seats = _context.Seats.Where(s => s.SeatFloor == floorNo).ToList();
                if (seats == null || seats.Count == 0)
                {
                    return NotFound($"No seats found for floor number {floorNo}");
                }
                return Ok(seats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult addSeat(Seat seat)
        {
            try
            {
                _context.Add(seat);
                _context.SaveChanges();
                return Ok($"Seat {seat.seatName} added in table");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult deleteSeatById(int id)
        {
            try
            {
                var seats = _context.seats.Find(id);
                if (seats == null)
                {
                    return BadRequest($"Product is not found with{id}");
                }
                _context.seats.Remove(seats);
                _context.SaveChanges();
                return Ok("Product details deleted ");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
