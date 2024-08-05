
using BMDApplication.Data;
using Microsoft.AspNetCore.Mvc;
using BMDApplication.Models;
using BMDApplication.Services.Interfaces;
namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ISeatService _seatService;
        public SeatController(ISeatService seatService)
        {
            _seatService = seatService;
        }
        [HttpGet("{floorNo}")]
        public IActionResult getSeatByFloorNo(int floorNo)
        {
            IEnumerable<Seat> seats = _seatService.getSeatByFloorNo(floorNo);
            
                if (seats == null )
                {
                    return NotFound($"No seats found for floor number {floorNo}");
                }
                return Ok(seats);
            }
          

       /* [HttpGet("{floorNo}")]
        public ActionResult getSeatByFloorNo(int floorNo)
        {
            var seats = _seatService.getSeatByFloorNo(floorNo);
            if (seats == null || seats.Count == 0)
            {
                return NotFound($"No seats found for floor number {floorNo}");
            }
            return Ok(seats);
        }*/
        /*[HttpPost]
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
   */
    }


}
