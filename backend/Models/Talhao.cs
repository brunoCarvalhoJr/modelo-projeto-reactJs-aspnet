using System;
using NetTopologySuite.Geometries;

namespace backend.Models
{
  public class Talhao
  {
    public int ID { get; set; }

    public String Nome { get; set; }
    public Geometry TheGeom { get; set; }

  }
}