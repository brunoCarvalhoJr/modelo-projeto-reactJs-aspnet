using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;
using NetTopologySuite.Geometries;

namespace backend.Results
{
  public class DetalhePonto
  {
    public DetalhePonto(Localizacao localizacao)
    {
      this.Id = localizacao.Id;
      this.Tipo = localizacao.Tipo;
      this.TheGeom = localizacao.TheGeom;
    }
    public Guid Id { get; set; }
    public String Tipo { get; set; }
    public Geometry TheGeom { get; set; }
  }

  public class DetalheTalhao
  {
    public DetalheTalhao(Talhao talhao)
    {
      this.Id = talhao.Id;
      this.Nome = talhao.Nome;
      this.TheGeom = talhao.TheGeom;
      this.Centro = TheGeom.Centroid;
      this.Pontos = talhao.Localizacoes.Select(l => new DetalhePonto(l)).ToList();
    }
    public Guid Id { get; set; }
    public String Nome { get; set; }
    public Geometry TheGeom { get; set; }
    public Point Centro { get; set; }
    public virtual List<DetalhePonto> Pontos { get; set; }

  }

  public class DetalheFazenda
  {
    public DetalheFazenda(Fazenda fazenda)
    {
      this.Id = fazenda.Id;
      this.Area = fazenda.Area;
      this.Nome = fazenda.Nome;
      this.Numero = fazenda.Numero;
      this.TheGeom = fazenda.TheGeom;
      this.Centro = TheGeom.Centroid;
      this.Talhoes = fazenda.Talhoes.Select(t => new DetalheTalhao(t)).ToList();
    }
    public Guid Id { get; set; }
    public String Nome { get; set; }
    public String Numero { get; set; }
    public double Area { get; set; }
    public Geometry TheGeom { get; set; }
    public Point Centro { get; set; }
    public virtual List<DetalheTalhao> Talhoes { get; set; }
  }
}