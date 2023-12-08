using Data.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(Configuration.DatabaseConnectionString);
        }

        public DbSet<Image> Images { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<AuctionSettings> AuctionSettings { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Item> Items { get; set; }

        public DbSet<ItemHistory> ItemsHistory { get; set; }
    }
}
