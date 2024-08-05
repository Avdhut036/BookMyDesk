using System.ComponentModel.DataAnnotations;

namespace BMDApplication.Models
{
    public class EmployeeDto
    {
        [Required]
        public int Id { get; set; }

        [StringLength(100, ErrorMessage = "Name length can't be more than 100.")]
        public string? Name { get; set; } // Nullable

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        [StringLength(50, ErrorMessage = "Email length can't be more than 50.")]
        public string? Email { get; set; } // Nullable

        [Range(0, int.MaxValue, ErrorMessage = "Floor number must be a positive integer.")]
        public int? Floor { get; set; } // Nullable

        [StringLength(100, ErrorMessage = "Seat name length can't be more than 100.")]
        public string? SeatName { get; set; } // Nullable

        [StringLength(50, ErrorMessage = "Role name length can't be more than 50.")]
        public string? RoleName { get; set; } // Nullable

        [StringLength(50, ErrorMessage = "Role frequency length can't be more than 50.")]
        public string? RoleFrequency { get; set; } // Nullable

     

    }
}
