
using System;
using System.Collections.Generic;
using System.Linq;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Sync.v1.Models;

namespace Sync.v1
{
  public class SyncPushService
  {
    private AgroContext agroContext { get; }

    public SyncPushService(AgroContext agroContext) => this.agroContext = agroContext;

    public void Execute(PopulateSchemas populate)
    {
      using (var transation = agroContext.Database.BeginTransaction())
      {
        var localizacoes = new LocalizacaoAdapter().Push(populate.Localizacao);
        var formularios = new FormularioAdapter().Push(populate.Formulario);
        var formularioItems = new FormularioItemAdapter().Push(populate.FormularioItem);
        var fotos = new FotoAdapter().Push(populate.Foto);

        localizacoes.ForEach((localizacao) =>
        {
          localizacao.Formularios = new List<backend.Models.Formulario>(formularios.Where(c => localizacao.Formularios.Any(f => f.Id.Equals(c.Id))));

          localizacao.Formularios.ForEach((formulario) =>
          {
            formulario.LocalizacaoId = localizacao.Id;
            formulario.Itens = new List<backend.Models.FormularioItem>(formularioItems.Where(c => formulario.Itens.Any(f => f.Id.Equals(c.Id))));
            formulario.Itens.ForEach((formularioItem) =>
            {
              formularioItem.FormularioId = formulario.Id;
              agroContext.FormularioItemAlternativas.Where(c=>c.FormularioItemId == formularioItem.Id).ToList().ForEach((deleted)=>{
                 agroContext.FormularioItemAlternativas.Remove(deleted);
              });
              new List<backend.Models.FormularioItemAlternativa>(formularioItem.Alternativas).ForEach((alternativa) =>
              {
                alternativa.FormularioItemId = formularioItem.Id;
                InsertOrUpdate(alternativa);
                agroContext.SaveChanges();
              });
              formularioItem.Alternativas.Clear();
              InsertOrUpdate(formularioItem);
            });
            formulario.Fotos = new List<backend.Models.Foto>(fotos.Where(c => formulario.Fotos.Any(f => f.Id.Equals(c.Id))));
            formulario.Fotos.ForEach((foto) =>
            {
              foto.FormularioId = formulario.Id;
              InsertOrUpdate(foto);
            });
            InsertOrUpdate(localizacao);
          });
          agroContext.SaveChanges();
          transation.Commit();
        });
      }
    }

    public void InsertOrUpdate<T>(T model) where T : class
    {
      EntityEntry<T> entry = agroContext.Entry(model);
      var primaryKey = entry.Metadata.FindPrimaryKey();
      if (primaryKey != null)
      {
        object[] keys = primaryKey.Properties.Select(x => x.FieldInfo.GetValue(model)).ToArray();
        T result = agroContext.Find<T>(keys);
        if (result == null)
        {
          agroContext.Add(model);
        }
        else
        {
          agroContext.Entry(result).State = EntityState.Detached;
          agroContext.Update(model);
        }
      }
    }
  }
}