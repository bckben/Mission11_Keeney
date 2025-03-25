using Microsoft.EntityFrameworkCore;
using Mission11_Keeney.Models;

namespace Mission11_Keeney.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Book> Books { get; set; }
    }
}