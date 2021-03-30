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
