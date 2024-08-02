using BMDApplication.Data;
using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;


namespace BMDApplication.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly BMDDbContext _context;

        public UserRepository(BMDDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.users
                .Select(user => new User
                {
                    userId = user.userId,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    emailId = user.emailId,
                    roleId = user.roleId,
                    roleFrequency = user.roleFrequency,
                    password = user.password,
                    phoneNo = user.phoneNo
                })
                .ToList();
        }
        public IEnumerable<EmployeeDto> GetEmployeeTable()
        {
            var query = from user in _context.users
                        join booking in _context.bookings
                            on user.userId equals booking.bookedBy into userBookings
                        from booking in userBookings.DefaultIfEmpty()
                        join seat in _context.seats
                            on booking.bookedSeatNo equals seat.seatId into bookingSeats
                        from seat in bookingSeats.DefaultIfEmpty()
                        join role in _context.roles
                            on user.roleId equals role.roleId
                        select new EmployeeDto
                        {
                            Id = user.userId,
                            Name = $"{user.firstName} {user.lastName}",
                            Email = user.emailId,
                            Floor = seat != null ? seat.seatFloor : 0, // Default value if no booking
                            SeatName = seat != null ? seat.seatName : "Not Booked", // Default value if no booking
                            RoleName = role != null ? role.roleName : "Unknown", // Default value if no role
                            RoleFrequency = user.roleFrequency
                        };

            return query.ToList();
        }
    }
}
