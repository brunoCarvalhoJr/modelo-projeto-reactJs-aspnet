using System;
using backend.Data;
using backend.Models;
using backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;

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

    [HttpPost]
    public Feature Post(CreateTalhao viewModel)
    {
      Talhao talhao = new Talhao();
      talhao.Nome = viewModel.Nome;
      talhao.Numero = viewModel.Numero;
      talhao.ImovelId = viewModel.ImovelId;
      talhao.TheGeom = viewModel.TheGeom.Geometry;
      context.Talhao.Add(talhao);
      context.SaveChanges();
      viewModel.TheGeom.Attributes.Add("nome", viewModel.Nome);
      viewModel.TheGeom.Attributes.Add("numero", viewModel.Numero);
      viewModel.TheGeom.Attributes.Add("imovelid", viewModel.ImovelId);
      return viewModel.TheGeom;
    }

    [HttpDelete("{id}")]
    public int Delete(int id)
    {
      var talhao = context.Talhao.Find(id);
      context.Remove(talhao);
      context.SaveChanges();
      return id;
    }
  }
}
