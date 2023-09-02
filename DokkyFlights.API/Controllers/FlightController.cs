using DokkyFlights.API.Dtos;
using DokkyFlights.API.ReadModels;
using Microsoft.AspNetCore.Mvc;
using DokkyFlights.API.Domain.Errors;
using DokkyFlights.API.Data;
using Microsoft.EntityFrameworkCore;
using DokkyFlights.API.Domain.Entities;

namespace DokkyFlights.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
     
    public class FlightController : ControllerBase
    {
        private readonly Entities _entities;
        private readonly ILogger<FlightController> _logger;

        public FlightController(ILogger<FlightController> logger, Entities entities)
        {
            _logger = logger;
            _entities = entities;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(IEnumerable<FlightRm>), 200)]
        public IEnumerable<FlightRm> Search([FromQuery] FlightSearchParameters @params)
        {

            _logger.LogInformation($"Searching for a flight for: {@params.Destination}");

            IQueryable<Flight> flights = _entities.Flights;

            if(!string.IsNullOrWhiteSpace(@params.Destination))
                flights = flights.Where(f => f.Arrival.Place.Contains(@params.Destination));

            if (!string.IsNullOrWhiteSpace(@params.From))
                flights = flights.Where(f => f.Departure.Place.Contains(@params.From));

            if (@params.FromDate != null)
                flights = flights.Where(f => f.Departure.Time >= @params.FromDate);

            if (@params.ToDate != null)
                flights = flights.Where(f => f.Arrival.Time <= @params.ToDate.Value.Date.AddDays(1).AddTicks(-1));

            if (@params.NumberOfPassengers != null && @params.NumberOfPassengers != 0)
                flights = flights.Where(f => f.RemainingNumberOfSeats >= @params.NumberOfPassengers);
            else
                flights = flights.Where(f => f.RemainingNumberOfSeats >= 1);

            var flightRmList = flights
                .Select(flight => new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats));

            return flightRmList;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(FlightRm),200)]
        public ActionResult<FlightRm> Find([FromRoute] Guid id)
        {
            var flight = _entities.Flights.SingleOrDefault(f => f.Id == id);

            if(flight == null)
                return NotFound();

            var readModel = new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats);


            return Ok(readModel);
        }

        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(200)]
        public IActionResult Book(BookDto dto) 
        {
            var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId);

            if (flight == null)
                return NotFound();

            var error = flight.MakeBooking(dto.PassengerEmail, dto.NumberOfSeats);

            if (error is OverBookError)
                return Conflict(new { message = "Number of requested seats exceeds the number of remaining seats" });

            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict(new { message = "An error occured while booking. Please try again." });
            }

            return CreatedAtRoute(' ', dto);
        }




    }
}