using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using NetTopologySuite.Geometries;

namespace backend.Models
{
  [Table("fazenda", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Fazenda : BaseModel
  {
    public String Nome { get; set; }
    public String Numero { get; set; }
    public double Area { get; set; }

    [Column(TypeName = "character varying(256)")]
    public SafraTipo SafraTipo { get; set; }

    public int SafraAnoInicio { get; set; }

    public int SafraAnoFim { get; set; }

    public Geometry TheGeom { get; set; }

    public virtual List<Talhao> Talhoes { get; set; } = new List<Talhao>();
    public virtual List<UsuarioFazenda> Usuarios { get; set; } = new List<UsuarioFazenda>();
  }

  public enum SafraTipo
  {
    SAFRA,
    SAFRINHA,
  }
}