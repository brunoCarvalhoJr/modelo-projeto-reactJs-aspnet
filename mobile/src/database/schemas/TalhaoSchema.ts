import {v4 as uuidv4} from 'uuid';
import {Base} from './BaseSchema';
import {Localizacao} from './LocalizacaoSchema';

class Talhao extends Base {
  public id: string;
  public nome: string;
  public codigo: string;
  public area: number;
  public theGeom: string;
  public centro: string;
  public localizacoes: Localizacao[] | undefined;

  constructor(nome: string, codigo: string, area: number, theGeom: string, centro: string) {
    super();
    this.id = uuidv4();
    this.nome = nome;
    this.codigo = codigo;
    this.area = area;
    this.theGeom = theGeom;
    this.centro = centro;
  }

  static schema = {
    primaryKey: 'id',
    name: 'Talhao',
    properties: {
      id: 'string',
      nome: 'string',
      codigo: 'string',
      area: 'float?',
      theGeom: 'string',
      centro: 'string',
      localizacoes: 'Localizacao[]',
      date: 'date',
    },
  };
}

export {Talhao};
