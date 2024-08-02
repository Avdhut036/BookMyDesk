using BMDApplication.Models;

namespace BMDApplication.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        IEnumerable<EmployeeDto> GetEmployeeTable();
    }
}
