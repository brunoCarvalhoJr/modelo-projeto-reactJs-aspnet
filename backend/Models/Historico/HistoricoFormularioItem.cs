using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models.Historico
{
  [Table("historico_formulario_item", Schema = Schema.SCHEMA_HISTORICO)]
  public class HistoricoFormularioItem : BaseModel
  {
    public String Valor { get; set; }
    public virtual String PerguntaNome { get; set; }

    [ForeignKey(nameof(Localizacao))]
    public Guid LocalizacaoId { get; set; }
    public virtual Localizacao Localizacao { get; set; }
    public virtual List<HistoricoFormularioItemAlternativa> Alternativas { get; set; } = new List<HistoricoFormularioItemAlternativa>();
  }
}
