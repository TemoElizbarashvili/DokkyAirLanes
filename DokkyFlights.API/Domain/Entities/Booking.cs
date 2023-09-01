namespace DokkyFlights.API.Domain.Entities
{
    public record Booking(
        string PassengerEmail,
        byte NumberOfSeats);
}
