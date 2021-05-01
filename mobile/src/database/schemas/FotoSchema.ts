import {v4 as uuidv4} from 'uuid';
import {Base} from './BaseSchema';

class Foto extends Base {
  public id: string;
  public uri: string;
  public nome: string;
  public path: string;

  constructor(uri: string, nome: string, path: string) {
    super();
    this.id = uuidv4();
    this.uri = uri;
    this.nome = nome;
    this.path = path;
  }

  static schema = {
    primaryKey: 'id',
    name: 'Foto',
    properties: {
      id: 'string',
      uri: 'string?',
      nome: 'string?',
      path: 'string?',
      date: 'date?',
    },
  };
}

export {Foto};
