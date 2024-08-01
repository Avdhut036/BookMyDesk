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

        public DbSet<User> users { get; set; }
        public DbSet<Seat> seats { get; set; }
        public DbSet<Booking> bookings { get; set; }
        public DbSet<Role> roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure User-Role relationship
            modelBuilder.Entity<User>()
                .HasOne(u => u.role)
                .WithMany(r => r.users)
                .HasForeignKey(u => u.roleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Booking-User (bookedBy) relationship
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.bookedByUser)
                .WithMany(u => u.bookings)
                .HasForeignKey(b => b.bookedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Booking-User (bookedFor) relationship
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.bookedForUser)
                .WithMany()
                .HasForeignKey(b => b.bookedFor)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Booking-Seat relationship
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.bookedSeat)
                .WithMany(s => s.bookings)
                .HasForeignKey(b => b.bookedSeatNo)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
