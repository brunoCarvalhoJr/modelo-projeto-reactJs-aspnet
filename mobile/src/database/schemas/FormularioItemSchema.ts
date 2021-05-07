import { v4 as uuidv4 } from 'uuid';
import { Pergunta } from './PerguntaSchema';
import { Alternativa } from './AlternativaSchema';
import { Base } from './BaseSchema';

class FormularioItem extends Base {
  public id: string;
  public valor: string | undefined;
  public ordem: number;
  public alternativas: Alternativa[] | undefined;
  public pergunta: Pergunta;

  constructor(pergunta: Pergunta) {
    super();
    this.id = uuidv4();
    this.pergunta = pergunta;
    this.ordem = pergunta.ordem;
    if (pergunta.tipo === 'select' && this.pergunta.alternativas[0]) {
      this.valor = this.pergunta.alternativas[0].id;
    }
  }

  static schema = {
    primaryKey: 'id',
    name: 'FormularioItem',
    properties: {
      id: 'string',
      valor: 'string?',
      ordem: 'int',
      pergunta: 'Pergunta',
      alternativas: 'Alternativa[]',
      date: 'date',
    },
  };
}

export { FormularioItem };
