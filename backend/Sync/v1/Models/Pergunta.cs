using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class Pergunta : ObjectId
  {
    public String Tipo { get; set; }
    public String Nome { get; set; }
    public bool Obrigatorio { get; set; } = false;
    public List<ObjectId> Alternativas { get; set; }
  }
}
