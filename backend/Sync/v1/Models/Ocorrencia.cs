using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class Ocorrencia : ObjectId
  {
    public String Nome { get; set; }
    public List<ObjectId> Perguntas { get; set; }
  }
}
