using BMDApplication.Models;

namespace BMDApplication.Services.Interfaces
{
    public interface ISeatService
    {
        /* List<Seat> getSeatByFloorNo(int seatFloor); */
        IEnumerable<Seat> getSeatByFloorNo(int floorNo);
    }
}
