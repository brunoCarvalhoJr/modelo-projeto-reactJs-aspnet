using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("formulario", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Formulario
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public String Nome { get; set; }
    public List<FormularioItem> Itens { get; set; }
    public List<Foto> Fotos { get; set; }

    [ForeignKey(nameof(Localizacao))]
    public Guid LocalizacaoId { get; set; }
    public virtual Localizacao Localizacao { get; set; }
  }
}
