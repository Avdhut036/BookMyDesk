using BMDApplication.Models;

namespace BMDApplication.Repositories.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> getAllUsers();
        IEnumerable<EmployeeDto> getEmployeeTable();
     
        int createUser(User user);
    }
}
