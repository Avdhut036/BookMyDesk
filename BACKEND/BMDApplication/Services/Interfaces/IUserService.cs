using BMDApplication.Models;

namespace BMDApplication.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> getAllUsers();
        IEnumerable<EmployeeDto> getEmployeeTable();
        int createUser(User user);
    }
}
