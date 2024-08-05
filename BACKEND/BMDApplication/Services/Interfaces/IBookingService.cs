using BMDApplication.Models;
using System.Collections.Generic;

namespace BMDApplication.Services.Interfaces
{
    public interface IBookingService
    {
        IEnumerable<BookingHistoryDTO> getBookingHistory();
    }
}






