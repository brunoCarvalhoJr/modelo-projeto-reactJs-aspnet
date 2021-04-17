using System;
using NetTopologySuite.Features;

namespace backend.Commands
{
  public class TalhaoCreateCommand
  {
    public String Nome { get; set; }
    public String Numero { get; set; }

    public Feature TheGeom { get; set; }

    public Guid FazendaId { get; set; }
  }
}
