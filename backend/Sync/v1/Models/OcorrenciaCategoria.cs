using System;
using System.Collections.Generic;
using Sync.Base;

namespace Sync.v1.Models
{
  public class OcorrenciaCategoria : ObjectId
  {
    public String Nome { get; set; }
    public String Tipo { get; set; }
    public int Ordem { get; set; }
    public String Icone { get; set; }
    public List<ObjectId> Ocorrencias { get; set; }
  }
}
