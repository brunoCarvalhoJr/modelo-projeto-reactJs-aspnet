
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
  public class AgroContext : DbContext
  {
    public AgroContext(DbContextOptions<AgroContext> options)
        : base(options)
    {
    }

    public DbSet<Talhao> Talhao { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Talhao>().ToTable("Talhao");
    }
  }
}