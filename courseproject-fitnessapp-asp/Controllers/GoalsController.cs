using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using courseproject_fitnessapp_asp;
using courseproject_fitnessapp_asp.Data;

namespace courseproject_fitnessapp_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public GoalsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Goals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoal()
        {
            return await _context.goals.ToListAsync();
        }

        // GET: api/Goals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Goal>> GetGoal(int id)
        {
            var goal = await _context.goals.FindAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            return goal;
        }

        // PUT: api/Goals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGoal(int id, Goal goal)
        {
            if (id != goal.id)
            {
                return BadRequest();
            }

            _context.Entry(goal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoalExists(id))
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

        // POST: api/Goals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Goal>> PostGoal(Goal goal)
        {
            _context.goals.Add(goal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGoal", new { id = goal.id }, goal);
        }

        // DELETE: api/Goals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Goal>> DeleteGoal(int id)
        {
            var goal = await _context.goals.FindAsync(id);
            if (goal == null)
            {
                return NotFound();
            }

            _context.goals.Remove(goal);
            await _context.SaveChangesAsync();

            return goal;
        }

        private bool GoalExists(int id)
        {
            return _context.goals.Any(e => e.id == id);
        }
    }
}
