using System.ComponentModel;

namespace DokkyFlights.API.Dtos
{
    public record FlightSearchParameters(

        [DefaultValue("09/01/2023 10:30:00 AM")]
        DateTime? FromDate,

        [DefaultValue("09/02/2023 10:30:00 AM")]
        DateTime? ToDate,

        [DefaultValue("Los Angeles")]
        string? From,

        [DefaultValue("Berlin")]
        string? Destination,

        [DefaultValue(1)]
        int? NumberOfPassengers
        );
}
