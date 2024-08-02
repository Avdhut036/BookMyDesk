using BMDApplication.Models;

namespace BMDApplication.Repositories.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        IEnumerable<EmployeeDto> GetEmployeeTable();
    }
}
