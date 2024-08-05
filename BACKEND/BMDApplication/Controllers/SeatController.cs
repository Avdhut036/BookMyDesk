
using BMDApplication.Data;
using Microsoft.AspNetCore.Mvc;
using BMDApplication.Models;
using BMDApplication.Services.Interfaces;
namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
<<<<<<< Updated upstream
    {
        private readonly ISeatService _seatService;
        public SeatController(ISeatService seatService)
        {
            _seatService = seatService;
=======
    {  
        private BMDDbContext _context;

     
        private readonly ISeatService _seatService;
        public SeatController(ISeatService seatService, BMDDbContext context)
        {
            _seatService = seatService;
            _context = context;
>>>>>>> Stashed changes
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
          

<<<<<<< Updated upstream
       /* [HttpGet("{floorNo}")]
        public ActionResult getSeatByFloorNo(int floorNo)
=======
        


        [HttpPost]//pattern not followed
        public IActionResult addSeat(Seat seat)
>>>>>>> Stashed changes
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


<<<<<<< Updated upstream
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
=======
        [HttpDelete("{id}")]//pattern not followed
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
>>>>>>> Stashed changes
    }


}
