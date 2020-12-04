using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using courseproject_fitnessapp_asp.Data;
using System;

namespace courseproject_fitnessapp_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public MeasurementsController(ApplicationContext context)
        {
            _context = context;
        }

        [Route("GetChartsData")]
        [HttpGet]
        public object GetChartsData()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(_context.measurement.ToList());
        }

        // GET: api/Measurements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Measurement>>> GetMeasurement()
        {
            return await _context.measurement.ToListAsync();
        }

        [HttpGet, Route("GetCurrentMeasurement/{id}")]
        public ActionResult<Measurement> GetCurrentMeasurement(int id)
        {
            return _context.measurement.ToList().Where(i => i.user_id == id).OrderByDescending(j => j.date_measurement).First();
        }

        // GET: api/Measurements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Measurement>> GetMeasurement(int id)
        {
            var measurement = await _context.measurement.FindAsync(id);

            if (measurement == null)
            {
                return null;
            }

            return measurement;
        }

        // PUT: api/Measurements/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeasurement(int id, Measurement measurement)
        {
            if (id != measurement.id)
            {
                return BadRequest();
            }

            _context.Entry(measurement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeasurementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Measurements
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Measurement>> PostMeasurement(Measurement measurement)
        {
            _context.measurement.Add(measurement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeasurement", new { id = measurement.id }, measurement);
        }

        // DELETE: api/Measurements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Measurement>> DeleteMeasurement(int id)
        {
            var measurement = await _context.measurement.FindAsync(id);
            if (measurement == null)
            {
                return NotFound();
            }

            _context.measurement.Remove(measurement);
            await _context.SaveChangesAsync();

            return measurement;
        }

        private bool MeasurementExists(int id)
        {
            return _context.measurement.Any(e => e.id == id);
        }
    }
}
