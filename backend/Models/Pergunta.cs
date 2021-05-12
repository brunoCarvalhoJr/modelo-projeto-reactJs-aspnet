using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("pergunta", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Pergunta : BaseModel
  {
    public String Nome { get; set; }
    public String Tipo { get; set; }
    public bool Obrigatorio { get; set; } = false;
    public int Ordem { get; set; }
    public Boolean Ativo { get; set; } = true;

    [ForeignKey(nameof(Ocorrencia))]
    public Guid OcorrenciaId { get; set; }
    public virtual Ocorrencia Ocorrencia { get; set; }
    public virtual List<Alternativa> Alternativas { get; set; } = new List<Alternativa>();
  }
}
