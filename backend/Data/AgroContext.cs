
using backend.Models;
using backend.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Models;
using Microsoft.AspNetCore.Identity;
using backend.Models.Historico;

namespace backend.Data
{
  public class AgroContext : IdentityDbContext<Usuario, Perfil, int>
  {
    public AgroContext(DbContextOptions<AgroContext> options)
        : base(options)
    {
    }

    public DbSet<Alternativa> Alternativas { get; set; }
    public DbSet<Fazenda> Fazendas { get; set; }
    public DbSet<Formulario> Formularios { get; set; }
    public DbSet<FormularioItem> FormularioItems { get; set; }
    public DbSet<FormularioItemAlternativa> FormularioItemAlternativas { get; set; }
    public DbSet<Foto> Fotos { get; set; }
    public DbSet<Localizacao> Localizacoes { get; set; }
    public DbSet<Ocorrencia> Ocorrencias { get; set; }
    public DbSet<OcorrenciaCategoria> OcorrenciaCategorias { get; set; }
    public DbSet<Pergunta> Perguntas { get; set; }
    public DbSet<Talhao> Talhoes { get; set; }
    public DbSet<Cultura> Culturas { get; set; }
    public DbSet<UsuarioFazenda> UsuarioFazenda { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }

    //HISTORICO
    public DbSet<HistoricoFormularioItem> HistoricoFormularioItems { get; set; }
    public DbSet<HistoricoFormularioItemAlternativa> HistoricoFormularioItemAlternativas { get; set; }
    public DbSet<HistoricoFoto> HistoricoFotos { get; set; }
    public DbSet<HistoricoLocalizacao> HistoricoLocalizacoes { get; set; }

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