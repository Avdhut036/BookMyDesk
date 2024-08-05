// Services/Implementations/RoleService.cs
using System.Collections.Generic;
using BMDApplication.Models;
using BMDApplication.Repositories.Interfaces;
using BMDApplication.Services.Interfaces;
using BookMyDesk.Repositories.Interfaces;

namespace BMDApplication.Services.Implementations
{
    public class SeatService : ISeatService
    {
        private readonly ISeatRepository _seatRepository;
        
        public SeatService(ISeatRepository seatRepository)
        {
            _seatRepository = seatRepository;
        }

      /*  public List<Seat> getSeatByFloorNo(int floorNo)
        {
            return _seatRepository.getSeatByFloorNo(floorNo);
        }
      */
        public IEnumerable<Seat> getSeatByFloorNo(int floorNo) {
            return _seatRepository.getSeatByFloorNo(floorNo);
        }
    }
}
