using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class FormularioAdapter : IBaseAdapter<Formulario, backend.Models.Formulario>
  {
    public List<Formulario> Pull(List<backend.Models.Formulario> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Formulario> Push(List<Formulario> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Formulario PullConvertEntity(backend.Models.Formulario source)
    {
      Formulario Formulario = new Formulario()
      {
        Id = source.Id,
        Nome = source.Nome,
        Ordem = source.Ordem,
        Responder = source.Responder,
        Fotos = source.Fotos.Select(c => new ObjectId(c.Id)).ToList(),
        Itens = source.Itens.Select(c => new ObjectId(c.Id)).ToList(),
        Date = source.DataSync
      };
      return Formulario;
    }

    public backend.Models.Formulario PushConvertEntity(Formulario source)
    {
      backend.Models.Formulario Formulario = new backend.Models.Formulario()
      {
        Id = source.Id,
        Nome = source.Nome,
        Ordem = source.Ordem,
        Responder = source.Responder,
        Fotos = source.Fotos.Select(c => new backend.Models.Foto { Id = c.Id }).ToList(),
        Itens = source.Itens.Select(c => new backend.Models.FormularioItem { Id = c.Id }).ToList(),
      };
      return Formulario;
    }
  }
}
