import {v4 as uuidv4} from 'uuid';
import {Foto} from './FotoSchema';
import {FormularioItem} from './FormularioItemSchema';
import {Base} from './BaseSchema';

class Formulario extends Base {
  public id: string;
  public nome: string;
  public itens: FormularioItem[];
  public fotos: Foto[] = [];

  constructor(nome: string, itens: FormularioItem[] = [], fotos: Foto[] = []) {
    super();
    this.id = uuidv4();
    this.nome = nome;
    this.fotos = fotos;
    this.itens = itens;
  }

  static schema = {
    primaryKey: 'id',
    name: 'Formulario',
    properties: {
      id: 'string',
      nome: 'string',
      fotos: 'Foto[]',
      itens: 'FormularioItem[]',
      date: 'date',
    },
  };
}

export {Formulario};
