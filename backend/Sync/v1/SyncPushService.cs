
using System;
using System.IO;
using System.Text.Json;
using backend.Data;

namespace Sync.v1
{
  public class SyncPushService
  {
    public void Execute(PopulateSchemas populate)
    {
      var jsonString = JsonSerializer.Serialize(populate);
      File.WriteAllText(Path.Combine("Sync", "Data", "Pendentes", $"{DateTime.UtcNow.ToString("dd-MM-yyyy H:mm")}.json"), jsonString);
    }
  }
}