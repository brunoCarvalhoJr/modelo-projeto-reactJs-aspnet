using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class PerguntaAdapter : IBaseAdapter<Pergunta, backend.Models.Pergunta>
  {
    public List<Pergunta> Pull(List<backend.Models.Pergunta> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Pergunta> Push(List<Pergunta> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Pergunta PullConvertEntity(backend.Models.Pergunta source)
    {
      Pergunta Pergunta = new Pergunta()
      {
        Id = source.Id,
        Nome = source.Nome,
        Tipo = source.Tipo,
        Obrigatorio = source.Obrigatorio,
        Alternativas = source.Alternativas.Select(c=> new ObjectId(c.Id)).ToList(),
        Date = source.DataSync
      };
      return Pergunta;
    }

    public backend.Models.Pergunta PushConvertEntity(Pergunta source)
    {
      backend.Models.Pergunta Pergunta = new backend.Models.Pergunta()
      {
        Id = source.Id,
        Nome = source.Nome
      };
      return Pergunta;
    }
  }
}
