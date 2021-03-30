using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using NetTopologySuite.Geometries;

namespace backend.Models
{
  [Table("fazenda", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Fazenda
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public String Nome { get; set; }
    public String Numero { get; set; }
    public double Area { get; set; }
    public Geometry TheGeom { get; set; }
    public List<Talhao> Talhoes { get; set; } = new List<Talhao>();
  }

}