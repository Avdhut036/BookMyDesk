
using BMDApplication.Models;

namespace BMDApplication.Services.Interfaces
{
    public interface ISeatService
    {

        IEnumerable<Seat> getSeatByFloorNo(int floorNo);

        Seat? getSeatById(int seatId);

    }
}
