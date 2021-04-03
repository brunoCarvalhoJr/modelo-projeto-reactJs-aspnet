using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("formulario_item", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class FormularioItem : BaseModel
  {
    public String Valor { get; set; }
    public virtual List<FormularioItemAlternativa> Alternativas { get; set; } = new List<FormularioItemAlternativa>();

    [ForeignKey(nameof(Pergunta))]
    public Guid PerguntaId { get; set; }
    public virtual Pergunta Pergunta { get; set; }

    [ForeignKey(nameof(Formulario))]
    public Guid FormularioId { get; set; }
    public virtual Formulario Formulario { get; set; }
  }
}
