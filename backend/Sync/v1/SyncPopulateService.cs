using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Sync.v1.Models;

namespace Sync.v1
{
  public class SyncPopulateService
  {
    private AgroContext agroContext { get; }

    public SyncPopulateService(AgroContext agroContext) => this.agroContext = agroContext;

    public void AddOrUpdateRange<TEntity>(DbSet<TEntity> set, IEnumerable<TEntity> entities) where TEntity : class
    {
      foreach (var entity in entities)
      {
        _ = !set.Any(e => e == entity) ? set.Add(entity) : set.Update(entity);
      }
    }

    public void Execute()
    {
      using (var transaction = agroContext.Database.BeginTransaction())
      {
        var path = Path.Combine("Sync", "Data", "Pendentes");
        var files = Directory.GetFiles(path, "*.json").OrderBy(f => new FileInfo(f).CreationTimeUtc);
        foreach (var file in files)
        {
          try
          {
            var jsonString = File.ReadAllText(file);
            PopulateSchemas populateSchemas = GetPopulate(jsonString);

            var localizacoes = new LocalizacaoAdapter().Push(populateSchemas.Localizacao);
            var formularios = new FormularioAdapter().Push(populateSchemas.Formulario);
            var formularioItems = new FormularioItemAdapter().Push(populateSchemas.FormularioItem);
            var fotos = new FotoAdapter().Push(populateSchemas.Foto);

            localizacoes.ForEach((localizacao) =>
            {
              var formulariosForSave = formularios.Where(f => localizacao.Formularios.Any(lf => lf.Id.Equals(f.Id))).ToList();
              formulariosForSave.ForEach((formulario) =>
              {
                formulario.LocalizacaoId = localizacao.Id;
                var formularioItensForSave = formularioItems.Where(f => formulario.Itens.Any(lf => lf.Id.Equals(f.Id))).ToList();
                formularioItensForSave.ForEach((formularioItem) =>
                {
                  formularioItem.FormularioId = formulario.Id;

                  if (!agroContext.FormularioItems.Any(e => e.Id == formularioItem.Id))
                  {
                    agroContext.FormularioItems.Add(formularioItem);
                  }
                  else
                  {
                    var formularioItemAlternativas = agroContext.FormularioItemAlternativas.Where(fIA => fIA.FormularioItemId.Equals(formularioItem.Id)).ToList();
                    agroContext.FormularioItemAlternativas.RemoveRange(formularioItemAlternativas);
                    agroContext.FormularioItemAlternativas.AddRange(formularioItem.Alternativas);
                    agroContext.SaveChanges();
                    formularioItem.Alternativas.Clear();
                    agroContext.FormularioItems.Update(formularioItem);
                    agroContext.SaveChanges();
                  }
                });

                var fotosForSave = fotos.Where(f => formulario.Fotos.Any(lf => lf.Id.Equals(f.Id))).ToList();
                fotosForSave.ForEach((foto) =>
                {
                  foto.FormularioId = formulario.Id;

                  if (!agroContext.Fotos.Any(e => e.Id == foto.Id))
                  {
                    agroContext.Fotos.Add(foto);
                  }
                  else
                  {
                    agroContext.Fotos.Update(foto);
                  }
                });

                formulario.Itens.Clear();
                formulario.Fotos.Clear();
              });

              localizacao.Formularios.Clear();
              var _l = !agroContext.Localizacoes.Any(e => e.Id == localizacao.Id) ? agroContext.Localizacoes.Add(localizacao) : agroContext.Localizacoes.Update(localizacao);
              AddOrUpdateRange(agroContext.Formularios, formulariosForSave);
              agroContext.SaveChanges();
            });
          }
          catch (Exception ex)
          {
            transaction.Rollback();
            Console.WriteLine(ex);
          }
          finally
          {
            File.Move(file, Path.Combine("Sync", "Data", "Processados", Path.GetFileName(file)));
          }
        }

        transaction.Commit();
      }
    }

    private PopulateSchemas GetPopulate(string jsonString)
    {
      return System.Text.Json.JsonSerializer.Deserialize<PopulateSchemas>(jsonString);
    }
  }
}