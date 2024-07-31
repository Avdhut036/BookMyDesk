using System.ComponentModel.DataAnnotations.Schema;

namespace BMDApplication.Models
{

    public class Booking
    {
        public int BookingId { get; set; }
        public DateTime UpdateDate { get; set; }
        public int BookedFloorNo { get; set; }
        public int BookedBy { get; set; } // foreign key for user 
        public int BookedFor { get; set; }
        public DateTime BookedDate { get; set; }
        public int BookedSeatNo { get; set; } // foreign key for seat

        [ForeignKey("BookedBy")]
        public User? BookedByUser { get; set; }

        [ForeignKey("BookedSeatNo")]
        public Seat? BookedSeat { get; set; }
    }
}


