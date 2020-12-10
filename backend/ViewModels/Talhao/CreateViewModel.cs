using System;
using NetTopologySuite.Features;

namespace backend.ViewModels
{
  public class CreateViewModel
  {
    public String Nome { get; set; }
    public Feature TheGeom { get; set; }
  }
}
