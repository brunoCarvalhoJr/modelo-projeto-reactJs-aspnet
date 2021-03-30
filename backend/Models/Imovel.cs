using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
  [Table("imovel", Schema = "monitoramento")]
  public class Imovel
  {
    [Column(name: "id")]
    public int Id { get; set; }

    public virtual List<Talhao> Talhoes { get; set; } = new List<Talhao>();
  }
}