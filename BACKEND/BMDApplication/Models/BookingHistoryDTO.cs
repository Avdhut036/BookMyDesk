using System;

namespace BMDApplication.Models
{
    public class BookingHistoryDTO
    {
        public int bookingId { get; set; }
        public string? bookedByName { get; set; }
        public string? bookedForName { get; set; }
        public string? seatName { get; set; }
        public int bookingFloorNo { get; set; }
        public DateTime bookedDate { get; set; }
        public DateTime bookedToDate { get; set; }
        public DateTime updateDate { get; set; }
    }
}
