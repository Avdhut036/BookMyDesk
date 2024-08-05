using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMDApplication.Models
{
    public class Role
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int roleId { get; set; }

        public string? roleName { get; set; }

        public ICollection<User> users { get; set; } = new List<User>();
    }
}
