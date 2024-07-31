using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMDApplication.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string? FirstName { get; set; } 

        [Required]
        [MaxLength(50)]
        public string? LastName { get; set; }

        [Required]
        [EmailAddress] 
        [MaxLength(50)]
        public string? EmailId { get; set; } 

        public int RoleId { get; set; }

        [Required]
        [MaxLength(50)]
        public string? RoleFrequency { get; set; } 

        [Required]
        [MaxLength(50)]
        public string? Password { get; set; } 

        [Required]
        [MaxLength(50)]
        public string? PhoneNo { get; set; } 

        [ForeignKey("RoleId")]
        public Role? Role { get; set; } // Navigation property

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>(); // Initialized collection
    }
}
