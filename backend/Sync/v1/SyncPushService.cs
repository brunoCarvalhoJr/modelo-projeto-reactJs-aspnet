
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Data;

namespace Sync.v1
{
  public class SyncPushService
  {
    private readonly SyncPopulateService syncPopulateService;
    public SyncPushService(SyncPopulateService syncPopulateService)
    {
      this.syncPopulateService = syncPopulateService;
    }

    public void Execute(PopulateSchemas populate)
    {
      var jsonString = JsonSerializer.Serialize(populate);
      File.WriteAllText(Path.Combine("Sync", "Data", "Pendentes", $"{DateTime.UtcNow.ToString("dd-MM-yyyy H:mm")}-{Guid.NewGuid()}.json"), jsonString);

      //TODO: RETIRAR DEPOIS QUE HOMOLOGAR
      Task.Delay(3000);

      syncPopulateService.Execute();
    }
  }
}