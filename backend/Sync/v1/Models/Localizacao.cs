using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class Localizacao : ObjectId
  {
    public String Tipo { get; set; }
    public object TheGeom { get; set; }
    public String Status { get; set; }
    public List<ObjectId> Formularios { get; set; }
    public Guid Talhao { get; set; }
    public DateTime Date;
  }
}
