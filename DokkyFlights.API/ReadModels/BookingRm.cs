namespace DokkyFlights.API.ReadModels
{
    public record BookingRm(
        Guid FlightId,
        string Airline,
        string Price,
        TimePlaceRm Arrival,
        TimePlaceRm Departure,
        int NumberOfSeats,
        string PassengerEmail);
}
