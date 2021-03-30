using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class OcorrenciaAdapter : IBaseAdapter<Ocorrencia, backend.Models.Ocorrencia>
  {
    public List<Ocorrencia> Pull(List<backend.Models.Ocorrencia> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Ocorrencia> Push(List<Ocorrencia> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Ocorrencia PullConvertEntity(backend.Models.Ocorrencia source)
    {
      Ocorrencia Ocorrencia = new Ocorrencia()
      {
        Id = source.Id,
        Nome = source.Nome,
        Perguntas = source.Perguntas.Select(c=> new ObjectId(c.Id)).ToList()
      };
      return Ocorrencia;
    }

    public backend.Models.Ocorrencia PushConvertEntity(Ocorrencia source)
    {
      backend.Models.Ocorrencia Ocorrencia = new backend.Models.Ocorrencia()
      {
        Id = source.Id,
        Nome = source.Nome
      };
      return Ocorrencia;
    }
  }
}
