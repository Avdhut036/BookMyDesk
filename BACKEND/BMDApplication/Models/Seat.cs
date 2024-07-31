namespace BMDApplication.Models
{
    public class Seat
    {
        public int SeatId { get; set; }
        public string? SeatName { get; set; }
        public int SeatFloor { get; set; }
        public string? SeatType { get; set; }
        public string? CurrentStatus { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }

}
