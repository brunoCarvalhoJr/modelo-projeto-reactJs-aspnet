using System.Collections.Generic;
using Newtonsoft.Json;
using Sync.v1.Models;

namespace Sync.v1
{
  public class PopulateSchemas
  {
    [JsonProperty(Order = 0)]
    public List<Alternativa> Alternativa { get; set; }

    [JsonProperty(Order = 1)]
    public List<Foto> Foto { get; set; }

    [JsonProperty(Order = 2)]
    public List<Pergunta> Pergunta { get; set; }

    [JsonProperty(Order = 3)]
    public List<Ocorrencia> Ocorrencia { get; set; }

    [JsonProperty(Order = 4)]
    public List<OcorrenciaCategoria> OcorrenciaCategoria { get; set; }

    [JsonProperty(Order = 6)]
    public List<FormularioItem> FormularioItem { get; set; }

    [JsonProperty(Order = 7)]
    public List<Formulario> Formulario { get; set; }

    [JsonProperty(Order = 8)]
    public List<Localizacao> Localizacao { get; set; }

    [JsonProperty(Order = 9)]
    public List<Talhao> Talhao { get; set; }

    [JsonProperty(Order = 10)]
    public List<Fazenda> Fazenda { get; set; }
  }
}