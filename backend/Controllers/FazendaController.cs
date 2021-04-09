
using backend.Data;
using backend.Models;
using backend.Results;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class FazendaController : Controller
  {
    private readonly AgroContext context;
    public FazendaController(AgroContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public DetalheFazenda Get() //Filtrar pelo id da fazenda
    {
      return new DetalheFazenda(this.context.Fazendas.FirstOrDefault());
    }
  }
}