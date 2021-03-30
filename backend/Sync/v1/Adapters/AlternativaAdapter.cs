using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class AlternativaAdapter : IBaseAdapter<Alternativa, backend.Models.Alternativa>
  {
    public List<Alternativa> Pull(List<backend.Models.Alternativa> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Alternativa> Push(List<Alternativa> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Alternativa PullConvertEntity(backend.Models.Alternativa source)
    {
      Alternativa alternativa = new Alternativa()
      {
        Id = source.Id,
        Nome = source.Nome
      };
      return alternativa;
    }

    public backend.Models.Alternativa PushConvertEntity(Alternativa source)
    {
      backend.Models.Alternativa alternativa = new backend.Models.Alternativa()
      {
        Id = source.Id,
        Nome = source.Nome
      };
      return alternativa;
    }
  }
}
