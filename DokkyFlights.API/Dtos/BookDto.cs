using System.ComponentModel.DataAnnotations;

namespace DokkyFlights.API.Dtos
{
    public record BookDto(
        [Required] Guid FlightId,
        [Required][EmailAddress][StringLength(100, MinimumLength = 3)] string PassengerEmail,
        [Required][Range(0,254)] byte NumberOfSeats);
}
