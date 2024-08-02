using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BMDApplication.Services.Interfaces;
using System.Collections.Generic;
using BMDApplication.Models;

namespace BMDApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingHistoryService;

        public BookingController(IBookingService bookingHistoryService)
        {
            _bookingHistoryService = bookingHistoryService;
        }

        [HttpGet("booking-history")]
        public IActionResult getBookingHistory()
        {
            IEnumerable<BookingHistoryDTO> bookingHistory = _bookingHistoryService.getBookingHistory();
            return Ok(bookingHistory);
        }
    }
}
