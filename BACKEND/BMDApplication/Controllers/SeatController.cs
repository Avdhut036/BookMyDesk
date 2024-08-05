using BMDApplication.Data;
using BMDApplication.Models;
using BMDApplication.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase

    {
        private readonly ISeatService _seatService;
        private BMDDbContext _context;
        public SeatController(ISeatService seatService,BMDDbContext context)
        {
            _seatService = seatService; 
            _context = context;
        }


        [HttpGet("byId/{seatId}")]  //pattern followed 
        public IActionResult getSeatById(int seatId)
        {
            var seat = _seatService.getSeatById(seatId);
            if (seat == null)
            {
                return NotFound($"seat not found with id {seatId}");
            }
            return Ok(seat);
        }

        [HttpGet("byFloor/{floorNo}")]//pattern not followed
        public IActionResult getSeatByFloorNo(int floorNo)
        {
            IEnumerable<Seat> seats = _seatService.getSeatByFloorNo(floorNo);
            
                if (seats == null )
                {
                    return NotFound($"No seats found for floor number {floorNo}");
                }
                return Ok(seats);
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



