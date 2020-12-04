using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using courseproject_fitnessapp_asp;
using courseproject_fitnessapp_asp.Data.Models;

namespace courseproject_fitnessapp_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodDiaryRecordsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public FoodDiaryRecordsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/FoodDiaryRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodDiaryRecord>>> Getfooddiary()
        {
            return await _context.fooddiary.ToListAsync();
        }

        // GET: api/FoodDiaryRecords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDiaryRecord>> GetFoodDiaryRecord(int id)
        {
            var foodDiaryRecord = await _context.fooddiary.FindAsync(id);

            if (foodDiaryRecord == null)
            {
                return NotFound();
            }

            return foodDiaryRecord;
        }

       
        //[HttpGet, Route("GetRecordsByUser/{user_id}")]
        //public ActionResult<IEnumerable<FoodDiaryRecord>> GetRecordsByUser(int user_id)
        //{
        //    return _context.fooddiary.ToListAsync().Where(i => i.user_id == user_id);
        //}

        // PUT: api/FoodDiaryRecords/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodDiaryRecord(int id, FoodDiaryRecord foodDiaryRecord)
        {
            if (id != foodDiaryRecord.id)
            {
                return BadRequest();
            }

            _context.Entry(foodDiaryRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodDiaryRecordExists(id))
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

        // POST: api/FoodDiaryRecords
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FoodDiaryRecord>> PostFoodDiaryRecord(FoodDiaryRecord foodDiaryRecord)
        {
            _context.fooddiary.Add(foodDiaryRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFoodDiaryRecord", new { id = foodDiaryRecord.id }, foodDiaryRecord);
        }

        // DELETE: api/FoodDiaryRecords/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FoodDiaryRecord>> DeleteFoodDiaryRecord(int id)
        {
            var foodDiaryRecord = await _context.fooddiary.FindAsync(id);
            if (foodDiaryRecord == null)
            {
                return NotFound();
            }

            _context.fooddiary.Remove(foodDiaryRecord);
            await _context.SaveChangesAsync();

            return foodDiaryRecord;
        }

        private bool FoodDiaryRecordExists(int id)
        {
            return _context.fooddiary.Any(e => e.id == id);
        }
    }
}
