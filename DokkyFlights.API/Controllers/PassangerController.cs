using DokkyFlights.API.Dtos;
using DokkyFlights.API.ReadModels;
using Microsoft.AspNetCore.Mvc;

namespace DokkyFlights.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PassangerController : ControllerBase
    {
        static private IList<NewPassangerDto> Passangers = new List<NewPassangerDto>();

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(NewPassangerDto dto)
        {
            Passangers.Add(dto);
            System.Diagnostics.Debug.WriteLine(Passangers.Count);
            return CreatedAtAction(nameof(Find), new {email = dto.Email});
        }

        [HttpGet("{email}")]
        public ActionResult<PassangerRm> Find([FromRoute]string email)
        {
            var passanger = Passangers.FirstOrDefault(p => p.Email == email);
            if (passanger == null)
                return NotFound();

            var rm = new PassangerRm(passanger.Email, passanger.FirstName, passanger.LastName, passanger.Gender);

            return Ok(rm);
            
        }


    }
}
