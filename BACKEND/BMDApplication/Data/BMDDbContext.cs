using Microsoft.EntityFrameworkCore;
using BMDApplication.Models;

namespace BMDApplication.Data
{
    public class BMDDbContext : DbContext
    {
        public BMDDbContext(DbContextOptions<BMDDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> BMDUsers { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.BookedByUser)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.BookedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.BookedSeat)
                .WithMany(s => s.Bookings)
                .HasForeignKey(b => b.BookedSeatNo)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
