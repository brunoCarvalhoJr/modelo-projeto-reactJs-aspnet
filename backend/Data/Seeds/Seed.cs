using System;
using System.IO;
using System.Linq;
using backend.Models;
using Models;
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

    public void Executar(Usuario usuario)
    {
      PopularPerguntas();

      if (agroContext.Fazendas.Count() == 0)
      {
        var geoJsonFazenda = File.ReadAllText(Path.Combine("Data", "Seeds", "fazenda.json"));
        var geoFazenda = validarGeoJSON(geoJsonFazenda);

        var geoJsonFazenda2 = File.ReadAllText(Path.Combine("Data", "Seeds", "fazenda_2.json"));
        var geoFazenda2 = validarGeoJSON(geoJsonFazenda2);

        var fazenda = new Fazenda()
        {
          Nome = "Fazenda 100",
          Numero = "1000",
          Area = 1,
          TheGeom = geoFazenda,
          SafraAnoInicio = 2021,
          SafraAnoFim = 2021,
          SafraTipo = SafraTipo.SAFRA
        };

        var fazenda2 = new Fazenda()
        {
          Nome = "Fazenda 200",
          Numero = "2000",
          Area = 1,
          TheGeom = geoFazenda2,
          SafraAnoInicio = 2021,
          SafraAnoFim = 2022,
          SafraTipo = SafraTipo.SAFRINHA
        };

        agroContext.Fazendas.Add(fazenda);
        agroContext.Fazendas.Add(fazenda2);

        var usuarioFazenda = new UsuarioFazenda
        {
          FazendaId = fazenda.Id,
          UsuarioId = usuario.Id
        };

        var usuarioFazenda2 = new UsuarioFazenda
        {
          FazendaId = fazenda.Id,
          UsuarioId = usuario.Id
        };

        agroContext.UsuarioFazenda.Add(usuarioFazenda);
        agroContext.UsuarioFazenda.Add(usuarioFazenda2);

        agroContext.SaveChanges();
      }
    }

    // drop table IF EXISTS public.aspnetusers CASCADE;
    // drop table IF EXISTS public.aspnetuserroles CASCADE;
    // drop table IF EXISTS public.aspnetroles CASCADE;
    // drop table IF EXISTS public.aspnetroleclaims CASCADE;
    // drop table IF EXISTS public.aspnetuserclaims CASCADE;
    // drop table IF EXISTS public.aspnetuserlogins CASCADE;
    // drop table IF EXISTS public.aspnetuserroles CASCADE;
    // drop table IF EXISTS public.aspnetusertokens CASCADE;
    // drop table IF EXISTS public."_EFMigrationsHistory" CASCADE;

    Guid ID_CULTURA_CAFE = Guid.Parse("688e02fd-7b68-49f1-a7e5-069141a69c70");
    private void PopularCulturas()
    {
      if (agroContext.Culturas.Count() != 0)
        return;

      Cultura cultura = new Cultura
      {
        Id = ID_CULTURA_CAFE,
        Nome = "Café"
      };

      agroContext.Culturas.Add(cultura);
    }

    private void PopularPerguntas()
    {
      if (agroContext.OcorrenciaCategorias.Count() != 0)
        return;

      var categoriaANOTACAO = new OcorrenciaCategoria()
      {
        Nome = "Anotação",
        Tipo = "ANOTACAO",
        Ordem = 0,
        Icone = "default",
      };

      var categoriaINSETO = new OcorrenciaCategoria()
      {
        Nome = "Inseto",
        Tipo = "OCORRENCIA",
        Ordem = 1,
        Icone = "virus",
      };

      var ocorrenciaINVASORA = new OcorrenciaCategoria()
      {
        Nome = "Invasora",
        Tipo = "OCORRENCIA",
        Ordem = 2,
        Icone = "spa",
      };

      agroContext.OcorrenciaCategorias.Add(categoriaANOTACAO);
      agroContext.OcorrenciaCategorias.Add(categoriaINSETO);
      agroContext.OcorrenciaCategorias.Add(ocorrenciaINVASORA);

      var ocorrenciaANOTACAO = new Ocorrencia()
      {
        Nome = "ANOTAÇÃO",
        Ordem = 0,
        OcorrenciaCategoriaId = categoriaANOTACAO.Id
      };

      var ocorrenciaPERCEVEJO_BARRIGA = new Ocorrencia()
      {
        Nome = "PERCEVEJO BARRIGA VERDE",
        Ordem = 1,
        OcorrenciaCategoriaId = ocorrenciaINVASORA.Id
      };

      var ocorrenciaPERCEVEJO_MARROM = new Ocorrencia()
      {
        Nome = "PERCEVEJO BARRIGA VERDE",
        Ordem = 2,
        OcorrenciaCategoriaId = ocorrenciaINVASORA.Id
      };

      var ocorrenciaFERRUGEM_CAFFEIRO = new Ocorrencia()
      {
        Nome = "FERRUGEM DO CAFEEIRO",
        Ordem = 3,
        OcorrenciaCategoriaId = categoriaINSETO.Id
      };

      agroContext.Ocorrencias.Add(ocorrenciaANOTACAO);
      agroContext.Ocorrencias.Add(ocorrenciaPERCEVEJO_BARRIGA);
      agroContext.Ocorrencias.Add(ocorrenciaPERCEVEJO_MARROM);
      agroContext.Ocorrencias.Add(ocorrenciaFERRUGEM_CAFFEIRO);

      //ANOTAÇÃO
      var perguntaANOTACAO = new Pergunta()
      {
        Nome = "Descrição da anotação",
        Tipo = "text",
        Ordem = 0,
        OcorrenciaId = ocorrenciaANOTACAO.Id
      };
      agroContext.Perguntas.Add(perguntaANOTACAO);

      //PERCEVEJO BARRIGA VERDE
      var perguntaPERCEVEJO_BARRIGA_1 = new Pergunta()
      {
        Nome = "No. de Adultos",
        Tipo = "text",
        Ordem = 0,
        OcorrenciaId = ocorrenciaPERCEVEJO_BARRIGA.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_BARRIGA_1);

      var perguntaPERCEVEJO_BARRIGA_2 = new Pergunta()
      {
        Nome = "Númeo amostra plantas",
        Tipo = "text",
        Ordem = 1,
        OcorrenciaId = ocorrenciaPERCEVEJO_BARRIGA.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_BARRIGA_2);

      var perguntaPERCEVEJO_BARRIGA_3 = new Pergunta()
      {
        Nome = "No. de Ninfas",
        Tipo = "text",
        Ordem = 2,
        OcorrenciaId = ocorrenciaPERCEVEJO_BARRIGA.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_BARRIGA_3);

      var perguntaPERCEVEJO_BARRIGA_4 = new Pergunta()
      {
        Nome = "Plantas Atacadas",
        Tipo = "text",
        Ordem = 3,
        OcorrenciaId = ocorrenciaPERCEVEJO_BARRIGA.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_BARRIGA_4);

      //PERCEVEJO MARROM
      var perguntaPERCEVEJO_MARROM_1 = new Pergunta()
      {
        Nome = "No. de Adultos",
        Tipo = "text",
        Ordem = 0,
        OcorrenciaId = ocorrenciaPERCEVEJO_MARROM.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_MARROM_1);

      var perguntaPERCEVEJO_MARROM_2 = new Pergunta()
      {
        Nome = "Númeo amostra plantas",
        Tipo = "text",
        Ordem = 1,
        OcorrenciaId = ocorrenciaPERCEVEJO_MARROM.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_MARROM_2);

      var perguntaPERCEVEJO_MARROM_3 = new Pergunta()
      {
        Nome = "No. de Ninfas",
        Tipo = "text",
        Ordem = 2,
        OcorrenciaId = ocorrenciaPERCEVEJO_MARROM.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_MARROM_3);

      var perguntaPERCEVEJO_MARROM_4 = new Pergunta()
      {
        Nome = "Plantas Atacadas",
        Tipo = "text",
        Ordem = 3,
        OcorrenciaId = ocorrenciaPERCEVEJO_MARROM.Id
      };
      agroContext.Perguntas.Add(perguntaPERCEVEJO_MARROM_4);

      //FERRUGEM_CAFFEIRO
      var perguntaFERRUGEM_CAFFEIRO_1 = new Pergunta()
      {
        Nome = "No. de Adultos",
        Tipo = "text",
        Ordem = 0,
        OcorrenciaId = ocorrenciaFERRUGEM_CAFFEIRO.Id
      };
      agroContext.Perguntas.Add(perguntaFERRUGEM_CAFFEIRO_1);

      var perguntaFERRUGEM_CAFFEIRO_2 = new Pergunta()
      {
        Nome = "Númeo amostra plantas",
        Tipo = "text",
        Ordem = 1,
        OcorrenciaId = ocorrenciaFERRUGEM_CAFFEIRO.Id
      };
      agroContext.Perguntas.Add(perguntaFERRUGEM_CAFFEIRO_2);

      var perguntaFERRUGEM_CAFFEIRO_3 = new Pergunta()
      {
        Nome = "No. de Ninfas",
        Tipo = "text",
        Ordem = 2,
        OcorrenciaId = ocorrenciaFERRUGEM_CAFFEIRO.Id
      };
      agroContext.Perguntas.Add(perguntaFERRUGEM_CAFFEIRO_3);

      var perguntaFERRUGEM_CAFFEIRO_4 = new Pergunta()
      {
        Nome = "Plantas Atacadas",
        Tipo = "text",
        Ordem = 3,
        OcorrenciaId = ocorrenciaFERRUGEM_CAFFEIRO.Id
      };
      agroContext.Perguntas.Add(perguntaFERRUGEM_CAFFEIRO_4);

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
