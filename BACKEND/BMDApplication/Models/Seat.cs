using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMDApplication.Models
{
    public class Seat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int seatId { get; set; }

        public string? seatName { get; set; }
        public int seatFloor { get; set; }
        public string? seatType { get; set; }
        public string? currentStatus { get; set; }

        public ICollection<Booking> bookings { get; set; } = new List<Booking>();
    }
}
