using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using courseproject_fitnessapp_asp;
using courseproject_fitnessapp_asp.Data.Models;
using System.IO;
using System.Net.Http.Headers;

namespace courseproject_fitnessapp_asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ImagesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Images/5
        [HttpGet]
        public async Task<ActionResult> GetImage(string path)
        {
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), path);
            var stream = await System.IO.File.ReadAllBytesAsync(fullPath);
            return File(stream, "application/octet-stream");
            
        }

        // POST: api/Images
        [HttpPost]
        public async Task<ActionResult<string>> PostImage()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName ="Resources";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}
