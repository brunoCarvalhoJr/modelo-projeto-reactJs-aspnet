
using backend.Models;
using backend.Extensions;
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

    protected override void OnModelCreating(ModelBuilder builder)
    {
      foreach (var entity in builder.Model.GetEntityTypes())
      {
        // Replace table names
        var currentTableName = builder.Entity(entity.Name).Metadata.GetTableName();
        builder.Entity(entity.Name).ToTable(currentTableName.ToLower());

        // Replace column names
        foreach (var property in entity.GetProperties())
        {
          property.SetColumnName(property.GetColumnName().ToSnakeCase());
        }

        foreach (var key in entity.GetKeys())
        {
          key.SetName(key.GetName().ToSnakeCase());
        }

        foreach (var key in entity.GetForeignKeys())
        {
          key.SetConstraintName(key.GetConstraintName().ToSnakeCase());
        }

        foreach (var index in entity.GetIndexes())
        {
          index.SetName(index.GetName().ToSnakeCase());
        }
      }
    }
  }
}