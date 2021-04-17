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
  public class TalhaoController : ControllerBase
  {
    private readonly AgroContext context;
    public TalhaoController(AgroContext context)
    {
      this.context = context;
    }

    [HttpGet("{fazenda}")]
    public List<Talhao> Get(Guid fazenda)
    {
      return this.context.Talhoes.Where(c => c.FazendaId.Equals(fazenda)).ToList();
    }

    [HttpPost]
    public Feature Post(TalhaoCreateCommand viewModel)
    {
      Talhao talhao = new Talhao();
      talhao.Nome = viewModel.Nome;
      talhao.Codigo = viewModel.Numero;
      talhao.FazendaId = viewModel.FazendaId;
      talhao.TheGeom = viewModel.TheGeom.Geometry;
      context.Talhoes.Add(talhao);
      context.SaveChanges();
      viewModel.TheGeom.Attributes.Add("nome", viewModel.Nome);
      viewModel.TheGeom.Attributes.Add("numero", viewModel.Numero);
      viewModel.TheGeom.Attributes.Add("imovelid", viewModel.FazendaId);
      return viewModel.TheGeom;
    }

    [HttpDelete("{id}")]
    public int Delete(int id)
    {
      var talhao = context.Talhoes.Find(id);
      context.Remove(talhao);
      context.SaveChanges();
      return id;
    }
  }
}
