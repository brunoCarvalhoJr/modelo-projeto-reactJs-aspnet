import {v4 as uuidv4} from 'uuid';
import {Base} from './BaseSchema';
import {Pergunta} from './PerguntaSchema';

class Ocorrencia extends Base {
  public id: string;
  public nome: string;
  public ordem: number;
  public perguntas: Pergunta[] = [];

  constructor(nome: string, ordem: number) {
    super();
    this.id = uuidv4();
    this.nome = nome;
    this.ordem = ordem;
  }

  static CODIGO = {
    ANOTACAO: {
      nome: 'Anotação',
      icone: 'default',
    },
    FERRUGEM: {
      nome: 'Ferrugem do cafeeiro',
      icone: 'default',
    },
    CERCOSPORA: {
      nome: 'Cercospora',
      icone: 'default',
    },
  };

  static schema = {
    primaryKey: 'id',
    name: 'Ocorrencia',
    properties: {
      id: 'string',
      nome: 'string',
      ordem: 'int',
      perguntas: 'Pergunta[]',
      date: 'date',
    },
  };
}

export {Ocorrencia};
