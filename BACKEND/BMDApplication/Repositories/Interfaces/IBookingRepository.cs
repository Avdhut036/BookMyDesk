using BMDApplication.Models;
using System.Collections.Generic;

namespace BMDApplication.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        IEnumerable<Booking> getAllBookingHistory();

        Booking createBooking(Booking booking);
    }
}