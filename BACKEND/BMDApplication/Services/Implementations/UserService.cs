using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;
using BMDApplication.Services.Interfaces;

namespace BMDApplication.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public IEnumerable<User> getAllUsers()
        {

        return _userRepository.getAllUsers();
        }

        public IEnumerable<EmployeeDto> getEmployeeTable() { 
            return _userRepository.getEmployeeTable();
        }

    }
}
