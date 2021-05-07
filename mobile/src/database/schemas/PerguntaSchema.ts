import {v4 as uuidv4} from 'uuid';
import {Alternativa} from './AlternativaSchema';
import {Base} from './BaseSchema';

class Pergunta extends Base {
  public id: string;
  public tipo: string;
  public nome: string;
  public ordem: number;
  public obrigatorio: boolean = false;
  public alternativas: Alternativa[] = [];

  constructor(tipo: string, nome: string, ordem: number) {
    super();
    this.id = uuidv4();
    this.tipo = tipo;
    this.nome = nome;
    this.ordem = ordem;
  }

  static schema = {
    primaryKey: 'id',
    name: 'Pergunta',
    properties: {
      id: 'string',
      tipo: 'string',
      nome: 'string',
      ordem: 'int',
      obrigatorio: 'bool',
      alternativas: 'Alternativa[]',
      date: 'date',
    },
  };
}

export {Pergunta};
