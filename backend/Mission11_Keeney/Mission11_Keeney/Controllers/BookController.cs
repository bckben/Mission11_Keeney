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

            var filteredBooks = (category == null || category == "All")
                ? _context.Books
                : _context.Books.Where(b => b.Category == category);

            int totalBooks = await filteredBooks.CountAsync();

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

        // ✅ ADD: Create new book
        [HttpPost("addbook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        // ✅ UPDATE: Edit existing book
        [HttpPut("updatebook/{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.FirstOrDefault(b => b.BookID == id);
            if (existingBook == null)
            {
                return NotFound();
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Price = updatedBook.Price;
            existingBook.Category = updatedBook.Category;
            existingBook.Publisher = updatedBook.Publisher;

            _context.SaveChanges();
            return Ok(existingBook);
        }

        // ✅ DELETE: Remove book by ID
        [HttpDelete("deletebook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.BookID == id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            _context.SaveChanges();
            return Ok();
        }
    }
}
