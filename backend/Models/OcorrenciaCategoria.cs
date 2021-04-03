using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("ocorrencia_categoria", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class OcorrenciaCategoria : BaseModel
  {
    public String Nome { get; set; }
    public String Tipo { get; set; }
    public int Ordem { get; set; }
    public String Icone { get; set; }
    public List<Ocorrencia> Ocorrencias { get; set; } = new List<Ocorrencia>();
  }
}
