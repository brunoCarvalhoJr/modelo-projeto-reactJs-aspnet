import {v4 as uuidv4} from 'uuid';
import {Foto} from './FotoSchema';
import {FormularioItem} from './FormularioItemSchema';
import {Base} from './BaseSchema';

class Formulario extends Base {
  public id: string;
  public nome: string;
  public responder: boolean;
  public ordem: number;
  public itens: FormularioItem[];
  public fotos: Foto[] = [];

  constructor(nome: string, responder: boolean, ordem: number = 0, itens: FormularioItem[] = [], fotos: Foto[] = []) {
    super();
    this.id = uuidv4();
    this.nome = nome;
    this.responder = responder;
    this.fotos = fotos;
    this.itens = itens;
    this.ordem = ordem;
  }

  static schema = {
    primaryKey: 'id',
    name: 'Formulario',
    properties: {
      id: 'string',
      nome: 'string',
      responder: 'bool',
      ordem: 'int',
      fotos: 'Foto[]',
      itens: 'FormularioItem[]',
      date: 'date',
    },
  };
}

export {Formulario};
