using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class FazendaAdapter : IBaseAdapter<Fazenda, backend.Models.Fazenda>
  {
    public List<Fazenda> Pull(List<backend.Models.Fazenda> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Fazenda> Push(List<Fazenda> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Fazenda PullConvertEntity(backend.Models.Fazenda source)
    {
      Fazenda alternativa = new Fazenda()
      {
        Id = source.Id,
        Nome = source.Nome,
        Numero = source.Numero,
        TheGeom = source.TheGeom.ConvertGeometriaToMobile(),
        Centro = source.TheGeom.Centroid.ConvertGeometriaToMobile(),
        Talhoes = source.Talhoes.Select(c => new ObjectId(c.Id)).ToList(),
        Date = source.DataSync
      };
      return alternativa;
    }

    public backend.Models.Fazenda PushConvertEntity(Fazenda source)
    {
      backend.Models.Fazenda alternativa = new backend.Models.Fazenda()
      {
        Id = source.Id,
        Nome = source.Nome
      };
      return alternativa;
    }
  }
}
