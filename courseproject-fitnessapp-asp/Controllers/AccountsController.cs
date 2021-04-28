using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using courseproject_fitnessapp_asp.Data;
using Microsoft.AspNetCore.Identity;
using courseproject_fitnessapp_asp_common;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace courseproject_fitnessapp_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        //private readonly UserManager<Account> _userManager;
        //private readonly SignInManager<Account> _signInManager;

        public AccountsController(ApplicationContext context)
        {
            _context = context;
            //_userManager = userManager;
            //_signInManager = signInManager;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.accounts.ToListAsync();
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(string id)
        {
            var account = await _context.accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(string id, Account account)
        {
            if (id != account.id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
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

        // POST: api/Accounts
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            //var result = await _userManager.CreateAsync(account, account.password);
            //EmailService emailService;
            //if (result.Succeeded)
            //{
            //    // генерация токена для пользователя
            //    var code = await _userManager.GenerateEmailConfirmationTokenAsync(account);
            //    var callbackUrl = Url.Action(
            //        "ConfirmEmail",
            //        "Accounts",
            //        new { userId = account.Id, code = code },
            //        protocol: HttpContext.Request.Scheme);
            //    emailService = new EmailService();
            //    await emailService.SendEmailAsync(account.email, "Confirm your account",
            //        $"Подтвердите регистрацию, перейдя по ссылке: <a href='{callbackUrl}'>link</a>");

            //    return Content("Для завершения регистрации проверьте электронную почту и перейдите по ссылке, указанной в письме");
            //}

             _context.accounts.Add(account);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountExists(account.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.id }, account);
        }

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> ConfirmEmail(string userId, string code)
        //{
        //    if (userId == null || code == null)
        //    {
        //        return BadRequest();
        //    }
        //    var user = await _userManager.FindByIdAsync(userId);
        //    if (user == null)
        //    {
        //        return BadRequest();
        //    }
        //    var result = await _userManager.ConfirmEmailAsync(user, code);
        //    if (result.Succeeded)
        //        return Ok();
        //    else
        //        return BadRequest();
        //}

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> DeleteAccount(string id)
        {
            var account = await _context.accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.accounts.Remove(account);
            await _context.SaveChangesAsync();

            return account;
        }

        private bool AccountExists(string id)
        {
            return _context.accounts.Any(e => e.id == id);
        }
    }
}
