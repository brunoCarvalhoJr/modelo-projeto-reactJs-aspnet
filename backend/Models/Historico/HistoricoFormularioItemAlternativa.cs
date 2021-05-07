using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models.Historico
{
  [Table("historico_formulario_item_alternativa", Schema = Schema.SCHEMA_HISTORICO)]
  public class HistoricoFormularioItemAlternativa : BaseModel
  {
    public Guid AlternativaId { get; set; }
    public String AlternativaNome { get; set; }

    [ForeignKey(nameof(HistoricoFormularioItem))]
    public Guid HistoricoFormularioItemId { get; set; }
    public virtual HistoricoFormularioItem HistoricoFormularioItem { get; set; }
  }
}
