using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class OcorrenciaCategoriaAdapter : IBaseAdapter<OcorrenciaCategoria, backend.Models.OcorrenciaCategoria>
  {
    public List<OcorrenciaCategoria> Pull(List<backend.Models.OcorrenciaCategoria> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.OcorrenciaCategoria> Push(List<OcorrenciaCategoria> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public OcorrenciaCategoria PullConvertEntity(backend.Models.OcorrenciaCategoria source)
    {
      OcorrenciaCategoria OcorrenciaCategoria = new OcorrenciaCategoria()
      {
        Id = source.Id,
        Nome = source.Nome,
        Tipo = source.Tipo,
        Ordem = source.Ordem,
        Icone = source.Icone,
        Ocorrencias = source.Ocorrencias.Select(c => new ObjectId(c.Id)).ToList(),
        Date = source.DataSync
      };
      return OcorrenciaCategoria;
    }

    public backend.Models.OcorrenciaCategoria PushConvertEntity(OcorrenciaCategoria source)
    {
      backend.Models.OcorrenciaCategoria OcorrenciaCategoria = new backend.Models.OcorrenciaCategoria()
      {
        Id = source.Id,
        Nome = source.Nome
      };
      return OcorrenciaCategoria;
    }
  }
}
