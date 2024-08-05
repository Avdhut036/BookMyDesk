<<<<<<< Updated upstream
using BMDApplication.Models;
=======
﻿using BMDApplication.Models;
>>>>>>> Stashed changes

namespace BMDApplication.Services.Interfaces
{
    public interface ISeatService
    {
<<<<<<< Updated upstream
        /* List<Seat> getSeatByFloorNo(int seatFloor); */
        IEnumerable<Seat> getSeatByFloorNo(int floorNo);
=======
        Seat? getSeatById(int seatId);
>>>>>>> Stashed changes
    }
}
