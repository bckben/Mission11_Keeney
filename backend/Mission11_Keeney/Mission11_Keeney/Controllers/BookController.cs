using Microsoft.AspNetCore.Mvc;
using Mission11_Keeney.Data;
using Mission11_Keeney.Models;
using Microsoft.EntityFrameworkCore;

namespace Mission11_Keeney.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }
    }
}