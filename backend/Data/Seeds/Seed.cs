using System.IO;
using System.Linq;
using backend.Models;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;

namespace backend.Data
{
  public class SeedFazenda
  {
    private readonly AgroContext agroContext;
    public SeedFazenda(AgroContext agroContext)
    {
      this.agroContext = agroContext;
    }

    public void Executar()
    {
      if (agroContext.Fazendas.Count() == 0)
      {
        var geoJsonFazenda = File.ReadAllText(Path.Combine("Data", "Seeds", "fazenda.json"));
        var geoFazenda = validarGeoJSON(geoJsonFazenda);

        var geoJsonTalhao001 = File.ReadAllText(Path.Combine("Data", "Seeds", "talhao_001.json"));
        var geoTalhao001 = validarGeoJSON(geoJsonTalhao001);

        var geoJsonTalhao002 = File.ReadAllText(Path.Combine("Data", "Seeds", "talhao_002.json"));
        var geoTalhao002 = validarGeoJSON(geoJsonTalhao002);

        var geoJsonTalhao003 = File.ReadAllText(Path.Combine("Data", "Seeds", "talhao_003.json"));
        var geoTalhao003 = validarGeoJSON(geoJsonTalhao003);

        var fazenda = new Fazenda()
        {
          Nome = "Fazenda 100",
          Numero = "1000",
          Area = 1,
          TheGeom = geoFazenda
        };

        agroContext.Fazendas.Add(fazenda);

        agroContext.Talhoes.Add(new Talhao()
        {
          Nome = "Talhao",
          Codigo = "001",
          TheGeom = geoTalhao001,
          FazendaId = fazenda.Id
        });

        agroContext.Talhoes.Add(new Talhao()
        {
          Nome = "Talhao",
          Codigo = "002",
          TheGeom = geoTalhao002,
          FazendaId = fazenda.Id
        });

        agroContext.Talhoes.Add(new Talhao()
        {
          Nome = "Talhao",
          Codigo = "003",
          TheGeom = geoTalhao003,
          FazendaId = fazenda.Id
        });

        agroContext.SaveChanges();
      }

      PopularPerguntas();
    }

    private void PopularPerguntas()
    {
      if (agroContext.OcorrenciaCategorias.Count() != 0)
        return;

      // ######################################################################################################
      // ################################### ANOTACAO #########################################################
      // ######################################################################################################
      OcorrenciaCategoria ocorrenciaCategoria = new OcorrenciaCategoria()
      {
        Nome = "Anotação",
        Tipo = "ANOTACAO",
        Ordem = 0,
        Icone = "default",
      };
      agroContext.OcorrenciaCategorias.Add(ocorrenciaCategoria);

      Ocorrencia ocorrencia = new Ocorrencia()
      {
        Nome = "Anotação",
        OcorrenciaCategoriaId = ocorrenciaCategoria.Id
      };
      agroContext.Ocorrencias.Add(ocorrencia);

      // ######################################################################################################
      // ################################### INSETO ###########################################################
      // ######################################################################################################
      ocorrenciaCategoria = new OcorrenciaCategoria()
      {
        Nome = "Inseto",
        Tipo = "OCORRENCIA",
        Ordem = 0,
        Icone = "virus",
      };
      agroContext.OcorrenciaCategorias.Add(ocorrenciaCategoria);

      ocorrencia = new Ocorrencia()
      {
        Nome = "Ferrugem do cafeeiro",
        OcorrenciaCategoriaId = ocorrenciaCategoria.Id
      };
      agroContext.Ocorrencias.Add(ocorrencia);

      Pergunta pergunta = new Pergunta()
      {
        Nome = "Pergunta Texto",
        Tipo = "text",
        OcorrenciaId = ocorrencia.Id
      };
      agroContext.Perguntas.Add(pergunta);

      pergunta = new Pergunta()
      {
        Nome = "Pergunta com Alternativa",
        Tipo = "select",
        OcorrenciaId = ocorrencia.Id
      };
      agroContext.Perguntas.Add(pergunta);

      Alternativa alternativa = new Alternativa()
      {
        Nome = "Alternativa 01",
        PerguntaId = pergunta.Id
      };
      agroContext.Alternativas.Add(alternativa);

      alternativa = new Alternativa()
      {
        Nome = "Alternativa 02",
        PerguntaId = pergunta.Id
      };
      agroContext.Alternativas.Add(alternativa);

      alternativa = new Alternativa()
      {
        Nome = "Alternativa 03",
        PerguntaId = pergunta.Id
      };
      agroContext.Alternativas.Add(alternativa);

      // ######################################################################################################
      // ################################### Doença ###########################################################
      // ######################################################################################################
      ocorrenciaCategoria = new OcorrenciaCategoria()
      {
        Nome = "Doença",
        Tipo = "OCORRENCIA",
        Ordem = 1,
        Icone = "spider",
      };
      agroContext.OcorrenciaCategorias.Add(ocorrenciaCategoria);

      // ######################################################################################################
      // ################################### Invasora #########################################################
      // ######################################################################################################
      ocorrenciaCategoria = new OcorrenciaCategoria()
      {
        Nome = "Invasora",
        Tipo = "OCORRENCIA",
        Ordem = 2,
        Icone = "spa",
      };
      agroContext.OcorrenciaCategorias.Add(ocorrenciaCategoria);

      // ######################################################################################################
      // ################################### Nematoide #########################################################
      // ######################################################################################################
      ocorrenciaCategoria = new OcorrenciaCategoria()
      {
        Nome = "Nematoide",
        Tipo = "OCORRENCIA",
        Icone = "pastafarianism",
        Ordem = 3,
      };
      agroContext.OcorrenciaCategorias.Add(ocorrenciaCategoria);

      // ######################################################################################################
      // ################################### Inimigo #########################################################
      // ######################################################################################################
      ocorrenciaCategoria = new OcorrenciaCategoria()
      {
        Nome = "Inimigo",
        Tipo = "OCORRENCIA",
        Ordem = 4,
        Icone = "otter",
      };
      agroContext.OcorrenciaCategorias.Add(ocorrenciaCategoria);

      // ######################################################################################################
      // ################################### Outro #########################################################
      // ######################################################################################################
      ocorrenciaCategoria = new OcorrenciaCategoria()
      {
        Nome = "Outro",
        Tipo = "OCORRENCIA",
        Ordem = 5,
        Icone = "pen-nib",
      };
      agroContext.OcorrenciaCategorias.Add(ocorrenciaCategoria);

      agroContext.SaveChanges();
    }

    private Geometry validarGeoJSON(string geoJson)
    {
      Feature geometry;
      var serializer = GeoJsonSerializer.Create();
      using (var stringReader = new StringReader(geoJson))
      using (var jsonReader = new JsonTextReader(stringReader))
      {
        geometry = serializer.Deserialize<Feature>(jsonReader);
      }
      return geometry.Geometry;
    }
  }
}
