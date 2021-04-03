using System;
using System.Collections.Generic;
using System.Linq;
using Sync.Base;

namespace Sync.v1.Models
{
  public class FotoAdapter : IBaseAdapter<Foto, backend.Models.Foto>
  {
    public List<Foto> Pull(List<backend.Models.Foto> source)
    {
      return source.Select(c => PullConvertEntity(c)).ToList();
    }

    public List<backend.Models.Foto> Push(List<Foto> source)
    {
      return source.Select(c => PushConvertEntity(c)).ToList();
    }

    public Foto PullConvertEntity(backend.Models.Foto source)
    {
      Foto Foto = new Foto()
      {
        Id = source.Id,
        Nome = source.Nome,
        Path = source.Path,
        Uri = source.Uri,
        Date = source.DataSync
      };
      return Foto;
    }

    public backend.Models.Foto PushConvertEntity(Foto source)
    {
      backend.Models.Foto Foto = new backend.Models.Foto()
      {
        Id = source.Id,
        Nome = source.Nome,
        Path = source.Path,
        Uri = source.Uri
      };
      return Foto;
    }
  }
}
