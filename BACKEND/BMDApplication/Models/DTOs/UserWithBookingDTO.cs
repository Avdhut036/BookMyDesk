namespace BMDApplication.Models.DTOs
{
    public class UserWithBookingDTO
    {
        public string? fName { get; set; }
        public string? lName { get; set; }
        public string? emailId { get; set; }
        public string? password { get; set; }
        public int role { get; set; }
        public string? frequency { get; set; }
        public int seatId { get; set; }
        public int floor { get; set; }
        public string? phoneNo { get; set; }
    }
}
