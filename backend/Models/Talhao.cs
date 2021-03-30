using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace backend.Models
{
  [Table("talhao", Schema = "monitoramento")]
  public class Talhao
  {
    public int ID { get; set; }

    [StringLength(200)]
    public String Nome { get; set; }

    [StringLength(20)]
    public String Numero { get; set; }

    public Geometry TheGeom { get; set; }

    #region Relacionamentos

    [ForeignKey(nameof(Imovel))]
    public int ImovelId { get; set; }

    #endregion
  }
}