using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("formulario_item_alternativa", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class FormularioItemAlternativa
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();

    [ForeignKey(nameof(Alternativa))]
    public Guid AlternativaId { get; set; }
    public virtual Alternativa Alternativa { get; set; }

    [ForeignKey(nameof(FormularioItem))]
    public Guid FormularioItemId { get; set; }
    public virtual FormularioItem FormularioItem { get; set; }
  }
}
