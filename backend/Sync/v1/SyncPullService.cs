
using System;
using System.Linq;
using backend.Data;
using Sync.v1.Models;

namespace Sync.v1
{
  public class SyncPullService
  {
    private AgroContext agroContext { get; }

    public SyncPullService(AgroContext agroContext) => this.agroContext = agroContext;

    public PopulateSchemas Execute()
    {
      var populateSchema = new PopulateSchemas();

      var alternativas = agroContext.Alternativas.ToList();
      populateSchema.Alternativa = new AlternativaAdapter().Get(alternativas);

      return populateSchema;
    }
  }
}