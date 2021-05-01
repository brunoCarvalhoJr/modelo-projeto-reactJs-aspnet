
using backend.Data;
using backend.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
  [Authorize]
  [ApiController]
  [Route("[controller]")]
  public class FazendaController : Controller
  {
    private readonly AgroContext context;

    public FazendaController(AgroContext context)
    {
      this.context = context;
    }

    [HttpGet("{fazenda}")]
    public DetalheFazenda Get(Guid fazenda)
    {
      return new DetalheFazenda(this.context.Fazendas.FirstOrDefault(c => c.Id.Equals(fazenda)));
    }

    [HttpGet]

    public List<dynamic> Get()
    {
      var UserId = int.Parse(HttpContext.Items["UserId"].ToString());
      return this.context.Fazendas
        .Where(f => f.Usuarios.Any(u => u.UsuarioId.Equals(UserId)))
        .Select(x => new { x.Id, x.Nome })
        .ToList<dynamic>();
    }
  }
}