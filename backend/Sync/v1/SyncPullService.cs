
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

    public PopulateSchemas Execute(string usuario, DateTime dataSync)
    {
      var populateSchema = new PopulateSchemas();

      if (dataSync.Year != DateTime.MinValue.Year)
        dataSync = dataSync.AddHours(-3);
      else
        dataSync = dataSync.ToUniversalTime();

      var alternativas = agroContext.Alternativas.Where(c => c.DataSync >= dataSync).ToList();
      populateSchema.Alternativa = new AlternativaAdapter().Pull(alternativas);

      var fotos = agroContext.Fotos.Where(c => c.DataSync >= dataSync).ToList();
      populateSchema.Foto = new FotoAdapter().Pull(fotos);

      var perguntas = agroContext.Perguntas.Where(c => c.Ativo && c.DataSync >= dataSync).ToList();
      populateSchema.Pergunta = new PerguntaAdapter().Pull(perguntas);

      var ocorrencias = agroContext.Ocorrencias.Where(c => c.DataSync >= dataSync).ToList();
      populateSchema.Ocorrencia = new OcorrenciaAdapter().Pull(ocorrencias);

      var ocorrenciasCategorias = agroContext.OcorrenciaCategorias.Where(c => c.DataSync >= dataSync).ToList();
      populateSchema.OcorrenciaCategoria = new OcorrenciaCategoriaAdapter().Pull(ocorrenciasCategorias);

      var formularioItems = agroContext.FormularioItems.Where(c => c.DataSync >= dataSync).Include(c => c.Alternativas).ToList();
      populateSchema.FormularioItem = new FormularioItemAdapter().Pull(formularioItems);

      var formularios = agroContext.Formularios.Where(c => c.DataSync >= dataSync).ToList();
      populateSchema.Formulario = new FormularioAdapter().Pull(formularios);

      var localizacoes = agroContext.Localizacoes.Where(c => c.DataSync >= dataSync).ToList();
      populateSchema.Localizacao = new LocalizacaoAdapter().Pull(localizacoes);

      var talhoes = agroContext.Talhoes.Where(c => c.DataSync >= dataSync).ToList();
      populateSchema.Talhao = new TalhaoAdapter().Pull(talhoes);

      var talhoesFazendaId = talhoes.Select(c => c.FazendaId).ToList();

      var fazendas = agroContext.Fazendas.Where(c => c.DataSync >= dataSync || talhoesFazendaId.Any(t => c.Id.Equals(t))).ToList();
      populateSchema.Fazenda = new FazendaAdapter().Pull(fazendas);

      return populateSchema;
    }
  }
}