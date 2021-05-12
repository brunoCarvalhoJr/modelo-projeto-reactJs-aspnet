using System;
using System.Collections.Generic;
using System.Linq;
using backend.Commands;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Features;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class OcorrenciaController : ControllerBase
  {
    private readonly AgroContext context;
    public OcorrenciaController(AgroContext context)
    {
      this.context = context;
    }

    [HttpGet()]
    public IActionResult Get()
    {
      return Ok(context.Ocorrencias.Select(o => new {o.Id, o.Nome}).ToList());
    }
  }
}
