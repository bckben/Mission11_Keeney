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
        public async Task<IActionResult> GetBooks(int pageNum = 1, string? category = null)
        {
            int pageSize = 10;

            // Filter books by category if one is selected
            var filteredBooks = (category == null || category == "All")
                ? _context.Books
                : _context.Books.Where(b => b.Category == category);

            // Total count for pagination
            int totalBooks = await filteredBooks.CountAsync();

            // Get books for the current page
            var books = await filteredBooks
                .OrderBy(b => b.BookID)
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                Books = books,
                CurrentPage = pageNum,
                TotalPages = (int)Math.Ceiling((double)totalBooks / pageSize)
            });
        }
    }
}