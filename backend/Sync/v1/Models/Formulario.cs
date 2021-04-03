using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class Formulario : ObjectId
  {
    public String Nome { get; set; }
    public List<ObjectId> Itens { get; set; } = new List<ObjectId>();
    public List<ObjectId> Fotos { get; set; } = new List<ObjectId>();
    public DateTime Date;
  }
}
