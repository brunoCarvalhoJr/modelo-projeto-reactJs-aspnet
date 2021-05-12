using System;
using System.Collections.Generic;
using System.Linq;
using backend.Commands;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class PerguntaController : ControllerBase
  {
    private readonly AgroContext context;
    public PerguntaController(AgroContext context)
    {
      this.context = context;
    }

    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
      return Ok(context.Perguntas.Find(id));
    }

    [HttpGet()]
    public IActionResult Get()
    {
      return Ok(context.Perguntas.Where(c => c.Ativo).Select(o => new
      {
        o.Id,
        o.Nome,
        o.Tipo,
        o.Ordem,
        Ocorrencia = o.Ocorrencia.Nome
      }).OrderBy(c => c.Ocorrencia).ToList());
    }

    [HttpPost]
    public Pergunta Post(PerguntaCreateCommand viewModel)
    {
      Pergunta pergunta = new Pergunta();
      pergunta.Nome = viewModel.Nome;
      pergunta.Tipo = viewModel.Tipo;
      pergunta.Ordem = viewModel.Ordem;
      pergunta.OcorrenciaId = viewModel.OcorrenciaId;
      viewModel.Alternativas.ForEach((alternativa) =>
      {
        alternativa.PerguntaId = pergunta.Id;
      });
      pergunta.Alternativas = viewModel.Alternativas;
      context.Perguntas.Add(pergunta);
      context.SaveChanges();
      return pergunta;
    }

    [HttpPut("{id}")]
    public Pergunta Put(Guid id, [FromBody] PerguntaEditCommand viewModel)
    {
      var pergunta = context.Perguntas.Find(id);
      pergunta.Nome = viewModel.Nome;
      pergunta.Tipo = viewModel.Tipo;
      pergunta.Ordem = viewModel.Ordem;
      pergunta.OcorrenciaId = viewModel.OcorrenciaId;
      viewModel.Alternativas.ForEach((alternativa) =>
      {
        alternativa.PerguntaId = pergunta.Id;
      });
      ApplyChangesCollection(pergunta.Alternativas, viewModel.Alternativas);
      pergunta.DataSync = DateTime.UtcNow;
      context.SaveChanges();
      return pergunta;
    }

    public void MarkState(object entity, EntityState entityState)
    {
      if (entityState == EntityState.Detached)
      {
        context.Entry(entity).State = entityState;
        return;
      }

      context.ChangeTracker.TrackGraph(
          entity,
          n =>
          {
            n.Entry.State = entityState;
          });
    }

    private void ApplyChangesCollection<TChild>(
          List<TChild> dbItems,
          List<TChild> newItems,
          Action<TChild> actionUpdate = null,
          Action<TChild> actionAdd = null,
          Action<TChild> actionDelete = null)
          where TChild : BaseModel, new()
    {
      dbItems.ForEach(item => MarkState(item, EntityState.Detached));

      newItems.ForEach((item) =>
      {
        if (dbItems.Any(c => c.Id == item.Id))
        {
          actionUpdate?.Invoke(item);
          MarkState(item, EntityState.Modified);
        }
        else
        {
          actionAdd?.Invoke(item);
          MarkState(item, EntityState.Added);
        }

      });

      dbItems.ForEach((item) =>
      {
        if (newItems.Any(c => c.Id != item.Id))
        {
          actionDelete?.Invoke(item);
          MarkState(item, EntityState.Deleted);
        }
      });

      if (newItems.Count == 0)
      {
        dbItems.ForEach((item) =>
        {
          actionDelete?.Invoke(item);
          MarkState(item, EntityState.Deleted);
        });
      }
    }


    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
      var pergunta = context.Perguntas.Find(id);
      pergunta.Ativo = false;
      context.SaveChanges();
      return Ok();
    }
  }
}
