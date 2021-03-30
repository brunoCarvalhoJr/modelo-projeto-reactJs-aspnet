using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("pergunta", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Pergunta
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public String Tipo { get; set; }
    public String Nome { get; set; }
    public bool Obrigatorio { get; set; }
    public List<Alternativa> Alternativas { get; set; }

    [ForeignKey(nameof(Ocorrencia))]
    public Guid OcorrenciaId { get; set; }
    public virtual Ocorrencia Ocorrencia { get; set; }
  }
}
