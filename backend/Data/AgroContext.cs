
using backend.Models;
using backend.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
  public class AgroContext : IdentityDbContext<Usuario, Perfil, int>
  {
    public AgroContext(DbContextOptions<AgroContext> options)
        : base(options)
    {
    }

    public DbSet<Talhao> Talhao { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.Ignore<IdentityUserLogin<int>>();
      builder.Ignore<IdentityUserRole<int>>();
      builder.Ignore<IdentityUserClaim<int>>();
      builder.Ignore<IdentityUserToken<int>>();
      builder.Ignore<IdentityUser<int>>();
      builder.Entity<Usuario>().HasKey(m => m.Id);
      builder.Entity<Perfil>().HasKey(m => m.Id);

      base.OnModelCreating(builder);

      foreach (var entity in builder.Model.GetEntityTypes())
      {
        // Replace table names
        var currentTableName = builder.Entity(entity.Name).Metadata.GetTableName();
        var currentSchema = builder.Entity(entity.Name).Metadata.GetSchema();
        if (currentSchema != null)
        {
          builder.Entity(entity.Name).ToTable(currentTableName.ToLower(), currentSchema.ToLower());
        }
        else
        {
          builder.Entity(entity.Name).ToTable(currentTableName.ToLower());
        }

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
          index.SetDatabaseName(index.GetDatabaseName().ToSnakeCase());
        }
      }
    }
  }
}