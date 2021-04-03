using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("ocorrencia", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Ocorrencia : BaseModel
  {
    public String Nome { get; set; }
    public List<Pergunta> Perguntas { get; set; } = new List<Pergunta>();

    [ForeignKey(nameof(OcorrenciaCategoria))]
    public Guid OcorrenciaCategoriaId { get; set; }
    public virtual OcorrenciaCategoria OcorrenciaCategoria { get; set; }
  }
}
