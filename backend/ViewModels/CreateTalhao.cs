using System;
using NetTopologySuite.Features;

namespace backend.ViewModels
{
  public class CreateTalhao
  {
    public String Nome { get; set; }
    public String Numero { get; set; }

    public Feature TheGeom { get; set; }

    public int ImovelId { get; set; }
  }
}
