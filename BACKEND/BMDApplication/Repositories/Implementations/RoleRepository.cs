// Repositories/Implementations/RoleRepository.cs
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;
using BMDApplication.Data;

namespace BMDApplication.Repositories.Implementations
{
    public class RoleRepository : IRoleRepository
    {
        private readonly BMDDbContext _context;

        public RoleRepository(BMDDbContext context)
        {
            _context = context;
        }

        public List<Role> getAllRoles()
        {
            return _context.roles.ToList();
        }
    }
}
