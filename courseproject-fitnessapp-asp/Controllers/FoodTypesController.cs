using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using courseproject_fitnessapp_asp.Data;

namespace courseproject_fitnessapp_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodTypesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public FoodTypesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/FoodTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodType>>> GetFoodType()
        {
            return await _context.foodtypes.ToListAsync();
        }

        // GET: api/FoodTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodType>> GetFoodType(int id)
        {
            var foodType = await _context.foodtypes.FindAsync(id);

            if (foodType == null)
            {
                return NotFound();
            }

            return foodType;
        }

        // PUT: api/FoodTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodType(int id, FoodType foodType)
        {
            if (id != foodType.id)
            {
                return BadRequest();
            }

            _context.Entry(foodType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodTypeExists(id))
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

        // POST: api/FoodTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FoodType>> PostFoodType(FoodType foodType)
        {
            _context.foodtypes.Add(foodType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFoodType", new { id = foodType.id }, foodType);
        }

        // DELETE: api/FoodTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FoodType>> DeleteFoodType(int id)
        {
            var foodType = await _context.foodtypes.FindAsync(id);
            if (foodType == null)
            {
                return NotFound();
            }

            _context.foodtypes.Remove(foodType);
            await _context.SaveChangesAsync();

            return foodType;
        }

        private bool FoodTypeExists(int id)
        {
            return _context.foodtypes.Any(e => e.id == id);
        }
    }
}
