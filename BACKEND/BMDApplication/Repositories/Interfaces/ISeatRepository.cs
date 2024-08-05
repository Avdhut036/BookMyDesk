using BMDApplication.Models;

namespace BookMyDesk.Repositories.Interfaces
{
    public interface ISeatRepository
    {
        IEnumerable<Seat> getSeatByFloorNo(int floorNo);
    }
}