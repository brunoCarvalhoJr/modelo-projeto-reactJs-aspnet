using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class Fazenda : ObjectId
  {
    public String Nome { get; set; }
    public String Numero { get; set; }
    public double Area { get; set; }
    public object TheGeom { get; set; }
    public List<ObjectId> Talhoes { get; set; } = new List<ObjectId>();
    public DateTime Date;
    public object Centro { get; set; }
  }
}

