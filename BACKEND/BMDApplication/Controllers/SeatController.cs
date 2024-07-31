﻿using BMDApplication.Data;
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
        [HttpPost]
        public IActionResult Post(Seat seat)
        {
            try
            {
                _context.Add(seat);
                _context.SaveChanges();
                return Ok($"Seat {seat.SeatName} added in table");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            try
            {
                var seats = _context.Seats.Find(id);
                if (seats == null)
                {
                    return BadRequest($"Product is not found with{id}");
                }
                _context.Seats.Remove(seats);
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
