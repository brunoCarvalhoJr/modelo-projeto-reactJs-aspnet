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

namespace backend.Controllers
{
  [Produces("application/json")]
  [Route("api/v1/sincronizacao")]
  public class SincronizacaoV1Controller : Controller
  {
    public SincronizacaoV1Controller()
    {
    }

    [HttpGet("{usuario}")]
    public async Task<IActionResult> GetAsync(string usuario)
    {
      await Task.Run(() => { });
      return Ok();
    }

    [HttpPost("{usuario}")]
    public async Task<IActionResult> PostAsync(string usuario)
    {
      await Task.Run(() => { });
      return Ok();
    }
  }
}
