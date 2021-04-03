using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("foto", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Foto : BaseModel
  {
    public String Uri { get; set; }
    public String Nome { get; set; }
    public String Path { get; set; }

    [ForeignKey(nameof(Formulario))]
    public Guid FormularioId { get; set; }
    public virtual Formulario Formulario { get; set; }
  }
}
