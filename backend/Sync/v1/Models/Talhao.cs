using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class Talhao : ObjectId
  {
    public String Nome { get; set; }
    public String Codigo { get; set; }
    public float Area { get; set; }
    public object TheGeom { get; set; }
    public List<ObjectId> Localizacoes { get; set; }

    public DateTime Date;
  }
}
