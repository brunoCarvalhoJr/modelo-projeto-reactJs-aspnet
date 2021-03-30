using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class LocalizacaoAdapter : IBaseAdapter<Localizacao, backend.Models.Localizacao>
  {
    public List<Localizacao> Pull(List<backend.Models.Localizacao> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Localizacao> Push(List<Localizacao> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Localizacao PullConvertEntity(backend.Models.Localizacao source)
    {
      Localizacao Localizacao = new Localizacao()
      {
        Id = source.Id,
        Tipo = source.Tipo,
        Status = source.Status,
        TheGeom = source.TheGeom.ConvertGeometriaToMobile(),
        Formularios = source.Formularios.Select(c => new ObjectId(c.Id)).ToList()
      };
      return Localizacao;
    }

    public backend.Models.Localizacao PushConvertEntity(Localizacao source)
    {
      backend.Models.Localizacao Localizacao = new backend.Models.Localizacao()
      {
        Id = source.Id,
      };
      return Localizacao;
    }
  }
}
