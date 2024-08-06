using System;
using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<User> getAllUsers()
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

        public IEnumerable<EmployeeDto> getEmployeeTable()
        {
            var currentDate = DateTime.Today; // Get current date

            // Get the current day's bookings with seat information
            var currentDayBookings = from booking in _context.bookings
                                     where booking.bookedDate.Date == currentDate
                                     join seat in _context.seats on booking.bookedSeatNo equals seat.seatId
                                     select new
                                     {
                                         UserId = booking.bookedFor,
                                         SeatName = seat.seatName,
                                         SeatFloor = seat.seatFloor
                                     };

            // Get the seat information for daily employees (assuming they have a dedicated seat)
            var dailySeats = from user in _context.users
                             join seat in _context.seats on user.userId equals seat.seatId
                             where user.roleFrequency == "Daily"
                             select new
                             {
                                 UserId = user.userId,
                                 SeatName = seat.seatName,
                                 SeatFloor = seat.seatFloor
                             };

            // Query to get all employees with their roles and seat info
            var query = from user in _context.users
                        join role in _context.roles on user.roleId equals role.roleId
                        let booking = currentDayBookings.FirstOrDefault(b => b.UserId == user.userId)
                        let seat = dailySeats.FirstOrDefault(ds => ds.UserId == user.userId)
                        select new EmployeeDto
                        {
                            Id = user.userId,
                            Name = $"{user.firstName} {user.lastName}",
                            Email = user.emailId,
                            Floor = booking != null ? booking.SeatFloor : seat != null ? seat.SeatFloor : (int?)null, // Nullable
                            SeatName = user.roleFrequency == "Daily"
                                        ? (seat != null ? seat.SeatName : "No Seat Allocated")
                                        : (booking != null ? booking.SeatName : "No Seat Allocated"),
                            RoleName = role.roleName,
                            RoleFrequency = user.roleFrequency
                        };

            return query
                .OrderByDescending(e => e.Id) // Order by Id or any other field as required
                .ToList();
        }

        public int createUser(User user)
        {
            _context.users.Add(user);
            _context.SaveChanges();
            return user.userId;
        }
    }
}
