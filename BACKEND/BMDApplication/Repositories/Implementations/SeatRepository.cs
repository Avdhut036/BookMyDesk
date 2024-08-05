
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;
using BMDApplication.Data;
using BookMyDesk.Repositories.Interfaces;

namespace BMDApplication.Repositories.Implementations
{
    public class SeatRepository : ISeatRepository
    {
        private readonly BMDDbContext _context;

        public SeatRepository(BMDDbContext context)
        {
            _context = context;
        }

        /*public  List<Seat> getSeatByFloorNo(int floorNo)
        {
            return _context.seats
                         .Where(seat => seat.seatFloor == floorNo)
                         .AsNoTracking()
                         .ToList();
        }*/
        public IEnumerable<Seat> getSeatByFloorNo(int floorNo)
        {
            return _context.seats.Where(s => s.seatFloor == floorNo).ToList();
        }


        public Seat? getSeatById(int seatId)
        {
            return _context.seats.FirstOrDefault(s=> s.seatId== seatId);    
        }
    }
}


