
using System;
using System.Linq;
using backend.Data;
using Sync.v1.Models;

namespace Sync.v1
{
  public class SyncPushService
  {
    private AgroContext agroContext { get; }

    public SyncPushService(AgroContext agroContext) => this.agroContext = agroContext;

    public void Execute(PopulateSchemas populate)
    {
    }
  }
}