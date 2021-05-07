using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Data;
using NetTopologySuite.Geometries;

namespace backend.Models.Historico
{
  [Table("historico_localizacao", Schema = Schema.SCHEMA_HISTORICO)]
  public class HistoricoLocalizacao : BaseModel
  {
    public String Tipo { get; set; }
    public Geometry TheGeom { get; set; }
    public String Status { get; set; }

    //dados historicos
    public String Nome { get; set; }
    public String Codigo { get; set; }
    public float Area { get; set; }
    public virtual String Cultura { get; set; }
    public Guid TalhaoId { get; set; }
    public Guid FazendaId { get; set; }
    public String FazendaNome { get; set; }
    public String SafraNome { get; set; }

    public String SafraTipo { get; set; }

    public int SafraAnoInicio { get; set; }

    public int SafraAnoFim { get; set; }

    public String FormularioNome { get; set; }

    public virtual List<HistoricoFormularioItem> Itens { get; set; } = new List<HistoricoFormularioItem>();

    public virtual List<HistoricoFoto> Fotos { get; set; } = new List<HistoricoFoto>();
  }
}
