using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Commands
{
  public class PerguntaEditCommand
  {
    public String Nome { get; set; }
    public String Tipo { get; set; }
    public int Ordem { get; set; }
    public Guid OcorrenciaId { get; set; }
    public List<Alternativa> Alternativas { get; set; } = new List<Alternativa>();
  }
}
