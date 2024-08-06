using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;
using BMDApplication.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BMDApplication.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingHistoryRepository;
        private readonly IBookingRepository _bookingRepository;

        public BookingService(IBookingRepository bookingHistoryRepository, IBookingRepository bookingRepository)
        {
            _bookingHistoryRepository = bookingHistoryRepository;
            _bookingRepository = bookingRepository; 
        }

        public IEnumerable<BookingHistoryDTO> getBookingHistory()
        {
            var bookings = _bookingHistoryRepository.getAllBookingHistory();

            return bookings.Select(b => new BookingHistoryDTO
            {
                bookingId = b.bookingId,
                bookedByName = b.bookedByUser?.firstName + " " + b.bookedByUser?.lastName,
                bookedForName = b.bookedForUser?.firstName + " " + b.bookedForUser?.lastName,
                seatName = b.bookedSeat?.seatName,
                bookingFloorNo = b.bookedFloorNo,
                bookedDate = b.bookedDate,
                bookedToDate = b.bookedDate.AddDays(7), 
                updateDate = b.updateDate
            }).ToList();
        }

        public Booking createBooking(Booking booking)
        {
            return _bookingRepository.createBooking(booking);
        }

    }
}