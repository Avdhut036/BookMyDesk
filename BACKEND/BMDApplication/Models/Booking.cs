using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMDApplication.Models
{
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int bookingId { get; set; }

        public DateTime updateDate { get; set; }
        public int bookedFloorNo { get; set; }
        public int bookedBy { get; set; } // Foreign key for User (who is booking)
        public int bookedFor { get; set; } // Foreign key for User (for whom the seat is booked)
        public DateTime bookedDate { get; set; }
        public int bookedSeatNo { get; set; } // Foreign key for Seat

        [ForeignKey("bookedBy")]
        public User? bookedByUser { get; set; } // Navigation property

        [ForeignKey("bookedFor")]
        public User? bookedForUser { get; set; } // Navigation property

        [ForeignKey("bookedSeatNo")]
        public Seat? bookedSeat { get; set; } // Navigation property
    }
}
