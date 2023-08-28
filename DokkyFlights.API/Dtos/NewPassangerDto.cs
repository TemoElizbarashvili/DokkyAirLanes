namespace DokkyFlights.API.Dtos
{
    public record NewPassangerDto(
        string Email,
        string FirstName,
        string LastName,
        bool Gender
        );
}
