using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMDApplication.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userId { get; set; }

        [Required]
        [MaxLength(50)]
        public string? firstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string? lastName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string? emailId { get; set; }

        public int roleId { get; set; }

        [Required]
        [MaxLength(50)]
        public string? roleFrequency { get; set; }

        [Required]
        [MaxLength(50)]
        public string? password { get; set; }

        [Required]
        [MaxLength(50)]
        public string? phoneNo { get; set; }

        [ForeignKey("roleId")]
        public Role? role { get; set; } // Navigation property

        public ICollection<Booking> bookings { get; set; } = new List<Booking>(); // Initialized collection
    }
}
