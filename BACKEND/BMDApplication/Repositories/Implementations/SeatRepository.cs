<<<<<<< Updated upstream
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
        public IEnumerable<Seat> getSeatByFloorNo   (int floorNo)
        {
            return _context.seats.Where(s => s.seatFloor == floorNo).ToList();
        }
    }
}
=======
﻿using BMDApplication.Data;
using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;

namespace BMDApplication.Repositories.Implementations
{
    public class SeatRepository:ISeatRepository
    {
        private readonly BMDDbContext _context;
        public SeatRepository(BMDDbContext context)
        {
            _context = context; 
        }

        //Get Seat Details by Id 
        public Seat? getSeatById(int seatId) {
            return _context.seats.FirstOrDefault(s => s.seatId == seatId); //FirstOrDefault->LINQ (Language Integrated Query) where s is instance of Seat , s represents details of each seat in a unit
        }


    }
}
>>>>>>> Stashed changes
