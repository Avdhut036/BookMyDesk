using BMDApplication.Data;
using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BMDApplication.Repositories.Implementations
{
    public class BookingRepository : IBookingRepository
    {
        private readonly BMDDbContext _context;

        public BookingRepository(BMDDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Booking> getAllBookingHistory()
        {
            return _context.bookings
                .Include(b => b.bookedByUser)
                .Include(b => b.bookedForUser)
                .Include(b => b.bookedSeat)
                .ToList();
        }
    }
}
