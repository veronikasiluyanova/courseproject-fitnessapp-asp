using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using courseproject_fitnessapp_asp.Data.Models;

namespace courseproject_fitnessapp_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterDiaryRecordsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public WaterDiaryRecordsController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet, Route("GetTodayWater/{id}")]
        public ActionResult<WaterDiaryRecord> GetTodayWater(int id)
        {
            return _context.waterdiary.ToList().Where(i => i.user_id == id).OrderByDescending(j => j.date_water).FirstOrDefault();
        }

        // GET: api/WaterDiaryRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaterDiaryRecord>>> Getwaterdiary()
        {
            return await _context.waterdiary.ToListAsync();
        }

        // GET: api/WaterDiaryRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WaterDiaryRecord>> GetWaterDiaryRecord(int id)
        {
            var waterDiaryRecord = await _context.waterdiary.FindAsync(id);

            if (waterDiaryRecord == null)
            {
                return NotFound();
            }

            return waterDiaryRecord;
        }

        // PUT: api/WaterDiaryRecords/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWaterDiaryRecord(int id, WaterDiaryRecord waterDiaryRecord)
        {
            if (id != waterDiaryRecord.id)
            {
                return BadRequest();
            }

            _context.Entry(waterDiaryRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WaterDiaryRecordExists(id))
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

        // POST: api/WaterDiaryRecords
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WaterDiaryRecord>> PostWaterDiaryRecord(WaterDiaryRecord waterDiaryRecord)
        {
            _context.waterdiary.Add(waterDiaryRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWaterDiaryRecord", new { id = waterDiaryRecord.id }, waterDiaryRecord);
        }

        // DELETE: api/WaterDiaryRecords/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WaterDiaryRecord>> DeleteWaterDiaryRecord(int id)
        {
            var waterDiaryRecord = await _context.waterdiary.FindAsync(id);
            if (waterDiaryRecord == null)
            {
                return NotFound();
            }

            _context.waterdiary.Remove(waterDiaryRecord);
            await _context.SaveChangesAsync();

            return waterDiaryRecord;
        }

        private bool WaterDiaryRecordExists(int id)
        {
            return _context.waterdiary.Any(e => e.id == id);
        }
    }
}
