using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("formulario", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Formulario : BaseModel
  {
    public String Nome { get; set; }
    public int Ordem { get; set; }
    public Boolean Responder { get; set; }
    public virtual List<FormularioItem> Itens { get; set; } = new List<FormularioItem>();
    public virtual List<Foto> Fotos { get; set; } = new List<Foto>();

    [ForeignKey(nameof(Localizacao))]
    public Guid LocalizacaoId { get; set; }
    public virtual Localizacao Localizacao { get; set; }
  }
}
