
using backend.Data;
using backend.Models;
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
    public Fazenda Get() //Filtrar pelo id da fazenda
    {
      return this.context.Fazendas.First();
    }
  }
}