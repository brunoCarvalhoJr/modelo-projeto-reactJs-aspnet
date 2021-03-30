using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class FormularioItem : ObjectId
  {
    public String Valor { get; set; }
    public virtual List<ObjectId> Alternativas { get; set; }
    public ObjectId Pergunta { get; set; }
  }
}
