using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using NetTopologySuite.Geometries;

namespace backend.Models
{
  [Table("talhao", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Talhao : BaseModel
  {
    public String Nome { get; set; }
    public String Codigo { get; set; }
    public float Area { get; set; }
    public Geometry TheGeom { get; set; }

    [ForeignKey(nameof(Fazenda))]
    public Guid FazendaId { get; set; }
    public virtual Fazenda Fazenda { get; set; }
    public virtual List<Localizacao> Localizacoes { get; set; } = new List<Localizacao>();
  }

}
