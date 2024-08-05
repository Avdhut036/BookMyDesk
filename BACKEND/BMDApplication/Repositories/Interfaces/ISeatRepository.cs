<<<<<<< Updated upstream
using BMDApplication.Models;

namespace BookMyDesk.Repositories.Interfaces
{
    public interface ISeatRepository
    {
        IEnumerable<Seat> getSeatByFloorNo(int floorNo);
    }
}
=======
﻿using BMDApplication.Models;

namespace BMDApplication.Repositories.Interfaces
{
    public interface ISeatRepository
    {
       Seat? getSeatById(int seatId);
    }
}
>>>>>>> Stashed changes
