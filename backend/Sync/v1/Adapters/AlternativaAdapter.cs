using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class AlternativaAdapter : IBaseAdapter<Alternativa, backend.Models.Alternativa>
  {
    public List<Alternativa> Get(List<backend.Models.Alternativa> source)
    {
      return source.Select(c => ConvertEntity(c)).ToList();
    }
    private Alternativa ConvertEntity(backend.Models.Alternativa source)
    {
      Alternativa alternativa = new Alternativa()
      {
          Id = source.Id,
          Nome = source.Nome
      };
      return alternativa;
    }
  }
}
