using System;
using backend.Data;
using backend.Models;
using backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
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
    public Geometry Post(CreateViewModel viewModel)
    {
      Talhao talhao = new Talhao();
      talhao.Nome = "nome";
      talhao.TheGeom = viewModel.TheGeom.Geometry;
      context.Talhao.Add(talhao);
      context.SaveChanges();
      return viewModel.TheGeom.Geometry;
    }
  }
}
