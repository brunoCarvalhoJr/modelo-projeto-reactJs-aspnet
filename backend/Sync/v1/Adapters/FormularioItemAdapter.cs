using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class FormularioItemAdapter : IBaseAdapter<FormularioItem, backend.Models.FormularioItem>
  {
    public List<FormularioItem> Pull(List<backend.Models.FormularioItem> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.FormularioItem> Push(List<FormularioItem> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public FormularioItem PullConvertEntity(backend.Models.FormularioItem source)
    {
      FormularioItem FormularioItem = new FormularioItem()
      {
        Id = source.Id,
        Valor = source.Valor,
        Pergunta = new ObjectId(source.PerguntaId),
        Alternativas = source.Alternativas.Select(c => new ObjectId(c.AlternativaId)).ToList(),
        Date = source.DataSync
      };
      return FormularioItem;
    }

    public backend.Models.FormularioItem PushConvertEntity(FormularioItem source)
    {
      backend.Models.FormularioItem FormularioItem = new backend.Models.FormularioItem()
      {
        Id = source.Id,
        Valor = source.Valor,
        PerguntaId = source.Pergunta.Id,
        Alternativas = source.Alternativas.Select(c => new backend.Models.FormularioItemAlternativa() { AlternativaId = c.Id }).ToList()
      };
      return FormularioItem;
    }
  }
}
