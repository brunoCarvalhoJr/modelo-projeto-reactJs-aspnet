using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("alternativa", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Alternativa
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public String Nome { get; set; }

    [ForeignKey(nameof(Pergunta))]
    public Guid PerguntaId { get; set; }
    public virtual Pergunta Pergunta { get; set; }
  }
}
