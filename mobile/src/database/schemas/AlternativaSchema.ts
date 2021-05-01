import {v4 as uuidv4} from 'uuid';
import {Base} from './BaseSchema';

class Alternativa extends Base {
  public id: string;
  public nome: string;

  constructor(nome: string) {
    super();
    this.id = uuidv4();
    this.nome = nome;
  }

  static schema = {
    primaryKey: 'id',
    name: 'Alternativa',
    properties: {
      id: 'string',
      nome: 'string',
      date: 'date',
    },
  };
}

export {Alternativa};
