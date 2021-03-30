using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("formulario_item", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class FormularioItem
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public String Valor { get; set; }
    public virtual List<FormularioItemAlternativa> Alternativas { get; set; }

    [ForeignKey(nameof(Pergunta))]
    public Guid PerguntaId { get; set; }
    public virtual Pergunta Pergunta { get; set; }

    [ForeignKey(nameof(Formulario))]
    public Guid FormularioId { get; set; }
    public virtual Formulario Formulario { get; set; }
  }
}
