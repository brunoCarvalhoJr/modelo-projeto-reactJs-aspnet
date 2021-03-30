using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("imovel", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Imovel
  {
    [Column(name: "id")]
    public int Id { get; set; }

    public virtual List<Talhao> Talhoes { get; set; } = new List<Talhao>();
  }
}