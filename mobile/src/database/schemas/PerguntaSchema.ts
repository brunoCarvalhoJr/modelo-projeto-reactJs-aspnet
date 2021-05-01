import {v4 as uuidv4} from 'uuid';
import {Alternativa} from './AlternativaSchema';
import {Base} from './BaseSchema';

class Pergunta extends Base {
  public id: string;
  public tipo: string;
  public nome: string;
  public obrigatorio: boolean = false;
  public alternativas: Alternativa[] = [];

  constructor(tipo: string, nome: string) {
    super();
    this.id = uuidv4();
    this.tipo = tipo;
    this.nome = nome;
  }

  static schema = {
    primaryKey: 'id',
    name: 'Pergunta',
    properties: {
      id: 'string',
      tipo: 'string',
      nome: 'string',
      obrigatorio: 'bool',
      alternativas: 'Alternativa[]',
      date: 'date',
    },
  };
}

export {Pergunta};
