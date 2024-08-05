
using BMDApplication.Models;

namespace BookMyDesk.Repositories.Interfaces
{
    public interface ISeatRepository
    {
        IEnumerable<Seat> getSeatByFloorNo(int floorNo);
        Seat? getSeatById(int id);  
        Seat? getSeatByName(string name, int seatFloor);
    }
}

