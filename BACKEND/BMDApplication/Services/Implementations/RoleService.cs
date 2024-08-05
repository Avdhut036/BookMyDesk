// Services/Implementations/RoleService.cs
using System.Collections.Generic;
using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;
using BMDApplication.Services.Interfaces;

namespace BMDApplication.Services.Implementations
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public List<Role> getAllRoles()
        {
            return _roleRepository.getAllRoles();
        }
    }
}
