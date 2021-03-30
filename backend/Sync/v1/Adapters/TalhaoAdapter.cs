using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class TalhaoAdapter : IBaseAdapter<Talhao, backend.Models.Talhao>
  {
    public List<Talhao> Pull(List<backend.Models.Talhao> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Talhao> Push(List<Talhao> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Talhao PullConvertEntity(backend.Models.Talhao source)
    {
      Talhao Talhao = new Talhao()
      {
        Id = source.Id,
        Nome = source.Nome,
        Area = source.Area,
        Codigo = source.Codigo,
        TheGeom = source.TheGeom.ConvertGeometriaToMobile(),
        Localizacoes = source.Localizacoes.Select(c => new ObjectId(c.Id)).ToList()
      };
      return Talhao;
    }

    public backend.Models.Talhao PushConvertEntity(Talhao source)
    {
      backend.Models.Talhao Talhao = new backend.Models.Talhao()
      {
        Id = source.Id,
        Nome = source.Nome
      };
      return Talhao;
    }
  }
}
