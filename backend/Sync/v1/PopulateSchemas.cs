using System.Collections.Generic;
using Newtonsoft.Json;
using Sync.v1.Models;

namespace Sync.v1
{
  public class PopulateSchemas
  {
    [JsonProperty(Order = 0)]
    public List<Alternativa> Alternativa { get; set; } = new List<Alternativa>();

    [JsonProperty(Order = 1)]
    public List<Foto> Foto { get; set; } = new List<Foto>();

    [JsonProperty(Order = 2)]
    public List<Pergunta> Pergunta { get; set; } = new List<Pergunta>();

    [JsonProperty(Order = 3)]
    public List<Ocorrencia> Ocorrencia { get; set; } = new List<Ocorrencia>();

    [JsonProperty(Order = 4)]
    public List<OcorrenciaCategoria> OcorrenciaCategoria { get; set; } = new List<OcorrenciaCategoria>();

    [JsonProperty(Order = 6)]
    public List<FormularioItem> FormularioItem { get; set; } = new List<FormularioItem>();

    [JsonProperty(Order = 7)]
    public List<Formulario> Formulario { get; set; } = new List<Formulario>();

    [JsonProperty(Order = 8)]
    public List<Localizacao> Localizacao { get; set; } = new List<Localizacao>();

    [JsonProperty(Order = 9)]
    public List<Talhao> Talhao { get; set; } = new List<Talhao>();

    [JsonProperty(Order = 10)]
    public List<Fazenda> Fazenda { get; set; } = new List<Fazenda>();
  }
}