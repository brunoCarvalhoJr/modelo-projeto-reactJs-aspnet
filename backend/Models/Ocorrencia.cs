using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("ocorrencia", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Ocorrencia
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public String Nome { get; set; }
    public List<Pergunta> Perguntas { get; set; }

    [ForeignKey(nameof(OcorrenciaCategoria))]
    public Guid OcorrenciaCategoriaId { get; set; }
    public virtual OcorrenciaCategoria OcorrenciaCategoria { get; set; }
  }
}
