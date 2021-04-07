using System.IO;
using System.Linq;
using backend.Data;

namespace Sync.v1
{
  public class SyncPopulateService
  {
    private AgroContext agroContext { get; }

    public SyncPopulateService(AgroContext agroContext) => this.agroContext = agroContext;

    public void Execute()
    {
      var path = Path.Combine("Sync", "Data", "Pendentes");
      var files = Directory.GetFiles(path, "*.json").OrderBy(f => new FileInfo(f).CreationTimeUtc);
      foreach (var file in files)
      {
        try
        {
          var jsonString = File.ReadAllText(file);
          PopulateSchemas populateSchemas = GetPopulate(jsonString);
        }
        finally
        {
          File.Move(file, Path.Combine("Sync", "Data", "Processados", Path.GetFileName(file)));
        }
      }
    }

    private PopulateSchemas GetPopulate(string jsonString)
    {
      return System.Text.Json.JsonSerializer.Deserialize<PopulateSchemas>(jsonString);
    }
  }
}