using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models.Historico
{
  [Table("historico_foto", Schema = Schema.SCHEMA_HISTORICO)]
  public class HistoricoFoto : BaseModel
  {
    public String Uri { get; set; }
    public String Nome { get; set; }
    public String Path { get; set; }

    [ForeignKey(nameof(Localizacao))]
    public Guid LocalizacaoId { get; set; }
    public virtual Localizacao Localizacao { get; set; }
  }
}
