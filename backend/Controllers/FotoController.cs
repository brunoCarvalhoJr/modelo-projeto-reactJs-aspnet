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
  public class FotoController : ControllerBase
  {
    private readonly AgroContext context;
    public FotoController(AgroContext context)
    {
      this.context = context;
    }

    [HttpGet("{foto}")]
    public IActionResult Get(Guid foto)
    {
      var bytes = Convert.FromBase64String(this.context.Fotos.FirstOrDefault(c => c.Id.Equals(foto)).Path);
      return File(bytes, "image/jpeg");
    }
  }
}
