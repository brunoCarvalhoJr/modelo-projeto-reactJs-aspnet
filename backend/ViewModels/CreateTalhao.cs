using System;
using NetTopologySuite.Features;

namespace backend.ViewModels
{
  public class CreateTalhao
  {
    public String Nome { get; set; }
    public Feature TheGeom { get; set; }
  }
}
