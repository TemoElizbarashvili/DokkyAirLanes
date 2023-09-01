using DokkyFlights.API.Domain.Entities;
using DokkyFlights.API.Dtos;
using DokkyFlights.API.ReadModels;
using Microsoft.AspNetCore.Mvc;
using DokkyFlights.API.Data;

namespace DokkyFlights.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassangerController : ControllerBase
    {
        private readonly Entities _entities;

        public PassangerController(Entities entities)
        {
            _entities = entities;
        }


        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassangerDto dto)
        {
            _entities.Passangers.Add(new Passenger(
                dto.Email,
                dto.FirstName,
                dto.LastName,
                dto.Gender));
            _entities.SaveChanges();
            return Ok(dto);
        }

        [HttpGet("{email}")]
        public ActionResult<PassangerRm> Find(string email)
        {
            var passanger = _entities.Passangers.FirstOrDefault(p => p.Email == email);
            if (passanger == null)
                return NotFound();

            var rm = new PassangerRm(passanger.Email, passanger.FirstName, passanger.LastName, passanger.Gender);

            return Ok(rm); 
        }
    }
}
