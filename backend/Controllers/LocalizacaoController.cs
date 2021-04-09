using System;
using System.Collections.Generic;
using System.Linq;
using backend.Data;
using backend.Models;
using backend.Results;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class LocalizacaoController : ControllerBase
  {
    private readonly AgroContext context;
    public LocalizacaoController(AgroContext context)
    {
      this.context = context;
    }

    [HttpGet("{fazenda}")]
    public List<Localizacao> Get(Guid fazenda)
    {
      return this.context.Localizacoes.Where(c => c.Talhao != null && c.Talhao.FazendaId.Equals(fazenda)).ToList();
    }

    [HttpGet("{localizacao}/detalhe")]
    public DetalheLocalizacao GetDetalhe(Guid localizacao)
    {
      var entity = this.context.Localizacoes.Where(c => c.Id.Equals(localizacao)).First();
      return new DetalheLocalizacao(entity);
    }
  }
}
