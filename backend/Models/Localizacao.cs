using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using NetTopologySuite.Geometries;

namespace backend.Models
{
  [Table("localizacao", Schema = Schema.SCHEMA_MONITORAMENTO)]
  public class Localizacao
  {
    [Key]
    [Required]
    public Guid Id { get; set; } = Guid.NewGuid();
    public String Tipo { get; set; }
    public Geometry TheGeom { get; set; }
    public String Status { get; set; }
    public List<Formulario> Formularios { get; set; }

    [ForeignKey(nameof(Talhao))]
    public Guid TalhaoId { get; set; }

    public virtual Talhao Talhao { get; set; }
  }
}
