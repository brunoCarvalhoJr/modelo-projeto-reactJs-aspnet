
using System;
using System.Linq;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Sync.v1.Models;

namespace Sync.v1
{
  public class SyncPullService
  {
    private AgroContext agroContext { get; }

    public SyncPullService(AgroContext agroContext) => this.agroContext = agroContext;

    public PopulateSchemas Execute(string usuario)
    {
      var populateSchema = new PopulateSchemas();

      var alternativas = agroContext.Alternativas.ToList();
      populateSchema.Alternativa = new AlternativaAdapter().Pull(alternativas);

      var fotos = agroContext.Fotos.ToList();
      populateSchema.Foto = new FotoAdapter().Pull(fotos);

      var perguntas = agroContext.Perguntas.ToList();
      populateSchema.Pergunta = new PerguntaAdapter().Pull(perguntas);

      var ocorrencias = agroContext.Ocorrencias.ToList();
      populateSchema.Ocorrencia = new OcorrenciaAdapter().Pull(ocorrencias);

      var ocorrenciasCategorias = agroContext.OcorrenciaCategorias.ToList();
      populateSchema.OcorrenciaCategoria = new OcorrenciaCategoriaAdapter().Pull(ocorrenciasCategorias);

      var formularioItems = agroContext.FormularioItems.Include(c => c.Alternativas).ToList();
      populateSchema.FormularioItem = new FormularioItemAdapter().Pull(formularioItems);

      var formularios = agroContext.Formularios.ToList();
      populateSchema.Formulario = new FormularioAdapter().Pull(formularios);

      var localizacoes = agroContext.Localizacoes.ToList();
      populateSchema.Localizacao = new LocalizacaoAdapter().Pull(localizacoes);

      var talhoes = agroContext.Talhoes.ToList();
      populateSchema.Talhao = new TalhaoAdapter().Pull(talhoes);

      var fazendas = agroContext.Fazendas.ToList();
      populateSchema.Fazenda = new FazendaAdapter().Pull(fazendas);

      return populateSchema;
    }
  }
}