using System;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;

namespace backend.Models
{
  [Table("cultura", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Cultura : BaseModel
  {
    public String Nome { get; set; }
  }
}