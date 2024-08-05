// Repositories/Interfaces/IRoleRepository.cs
using System.Collections.Generic;
using BMDApplication.Models;

namespace BMDApplication.Repositories.Interfaces
{
    public interface IRoleRepository
    {
        List<Role> getAllRoles();
    }
}
