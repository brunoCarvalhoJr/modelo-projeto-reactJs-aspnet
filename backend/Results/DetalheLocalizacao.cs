using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;

namespace backend.Results
{
  public class DetalheFoto
  {
    public Guid Id { get; set; }

    public DetalheFoto(Foto foto)
    {
      this.Id = foto.Id;
    }
  }

  public class DetalheFormularioItem
  {
    public DetalheFormularioItem(FormularioItem formularioItem)
    {
      this.Valor = formularioItem.Valor;
      if (!string.IsNullOrEmpty(formularioItem.Valor) && formularioItem.Pergunta.Tipo == "select" && formularioItem.Pergunta.Alternativas.Any())
      {
        this.Valor = formularioItem.Pergunta.Alternativas.FirstOrDefault(c => c.Id.Equals(Guid.Parse(formularioItem.Valor)))?.Nome;
      }
      this.Tipo = formularioItem.Pergunta.Tipo;
      this.Alternativas = formularioItem.Alternativas.Select(f => f.Alternativa.Nome).ToList();
      this.Pergunta = formularioItem.Pergunta.Nome;
      this.Ordem = formularioItem.Pergunta.Ordem;
    }

    public String Valor { get; set; }
    public String Tipo { get; set; }
    public int Ordem { get; set; }
    public String Pergunta { get; set; }
    public virtual List<String> Alternativas { get; set; }
  }

  public class DetalheFormulario
  {
    public DetalheFormulario(Formulario formulario)
    {
      this.Nome = formulario.Nome;
      this.Responder = formulario.Responder;
      this.Itens = formulario.Itens.Select(c => new DetalheFormularioItem(c)).ToList();
      this.Fotos = formulario.Fotos.Select(c => new DetalheFoto(c)).ToList();
    }

    public String Nome { get; set; }
    public Boolean Responder { get; set; }
    public List<DetalheFoto> Fotos { get; set; }
    public List<DetalheFormularioItem> Itens { get; set; }
  }

  public class DetalheLocalizacao
  {
    public DetalheLocalizacao(Localizacao localizacao)
    {
      this.Tipo = localizacao.Tipo;
      this.Talhao = localizacao.Talhao.Nome;
      this.Status = localizacao.Status;
      this.Formularios = localizacao.Formularios.Select(f => new DetalheFormulario(f)).ToList();
    }

    public String Tipo { get; set; }
    public String Status { get; set; }
    public string Talhao { get; set; }
    public List<DetalheFormulario> Formularios { get; set; }
  }
}