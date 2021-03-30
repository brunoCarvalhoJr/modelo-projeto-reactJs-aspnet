using System.IO;
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
      var geoJsonFazenda = File.ReadAllText(Path.Combine("Data", "Seeds", "fazenda.json"));
      var geoFazenda = validarGeoJSON(geoJsonFazenda);

      var geoJsonTalhao001 = File.ReadAllText(Path.Combine("Data", "Seeds", "talhao_001.json"));
      var geoTalhao001 = validarGeoJSON(geoJsonTalhao001);

      agroContext.Talhao.Add(new Talhao(){
         Nome = "Talhao",
         Numero = "200",
         TheGeom = geoTalhao001
      });

      agroContext.SaveChanges();

      var geoJsonTalhao002 = File.ReadAllText(Path.Combine("Data", "Seeds", "talhao_002.json"));
      var geoTalhao002 = validarGeoJSON(geoJsonTalhao002);

      var geoJsonTalhao003 = File.ReadAllText(Path.Combine("Data", "Seeds", "talhao_003.json"));
      var geoTalhao003 = validarGeoJSON(geoJsonTalhao003);

    }

    private Geometry validarGeoJSON(string geoJson)
    {
      Feature geometry;
      string retorno;
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
