using System;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using Models;

namespace backend.Models
{
  [Table("usuario_fazenda", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class UsuarioFazenda : BaseModel
  {
    [ForeignKey(nameof(Usuario))]
    public int UsuarioId { get; set; }

    [ForeignKey(nameof(Fazenda))]
    public Guid FazendaId { get; set; }
  }

}