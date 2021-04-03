using System;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("alternativa", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Alternativa : BaseModel
  {
    public String Nome { get; set; }

    [ForeignKey(nameof(Pergunta))]
    public Guid PerguntaId { get; set; }
    public virtual Pergunta Pergunta { get; set; }
  }
}
