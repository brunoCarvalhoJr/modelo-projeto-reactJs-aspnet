using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Models;
using Sync.v1;

namespace backend.Controllers
{
  [Produces("application/json")]
  [Route("v1/sincronizacao")]
  public class SincronizacaoV1Controller : Controller
  {
    private readonly SyncPullService syncPullService;
    private readonly SyncPushService syncPushService;
    private readonly SyncPopulateService syncPopulateService;

    public SincronizacaoV1Controller(SyncPullService syncPullService, SyncPushService syncPushService, SyncPopulateService syncPopulateService)
    {
      this.syncPullService = syncPullService;
      this.syncPushService = syncPushService;
      this.syncPopulateService = syncPopulateService;
    }

    [HttpGet("{usuario}/{dateSync}")]
    public async Task<IActionResult> GetAsync(string usuario, DateTime dateSync)
    {
      await Task.Run(() => { });
      var populateSchemas = this.syncPullService.Execute(usuario, dateSync);
      return Ok(populateSchemas);
    }

    [HttpGet()]
    public async Task<IActionResult> GetPopulateAsync()
    {
      await Task.Run(() => { });
      this.syncPopulateService.Execute();
      return Ok();
    }

    [HttpPost("{usuario}")]
    public async Task<IActionResult> PostAsync(string usuario, [FromBody] PopulateSchemas schemas)
    {
      await Task.Run(() => { });
      this.syncPushService.Execute(schemas);
      return Ok();
    }
  }
}
