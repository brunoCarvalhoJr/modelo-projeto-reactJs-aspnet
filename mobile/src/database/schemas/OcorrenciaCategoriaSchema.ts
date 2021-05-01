import {v4 as uuidv4} from 'uuid';
import {Base} from './BaseSchema';
import {Ocorrencia} from './OcorrenciaSchema';

class OcorrenciaCategoria extends Base {
  public id: string;
  public nome: string;
  public tipo: string;
  public ordem: number;
  public icone: string;
  public ocorrencias: Ocorrencia[] = [];

  constructor(nome: string, tipo: string, ordem: number, icone: string) {
    super();
    this.id = uuidv4();
    this.nome = nome;
    this.tipo = tipo;
    this.ordem = ordem;
    this.icone = icone;
  }

  static CODIGO = {
    ANOTACAO: {
      nome: 'Anotação',
      tipo: 'ANOTACAO',
      ordem: 0,
      icone: 'default',
    },
    INSETO: {
      nome: 'Inseto',
      tipo: 'OCORRENCIA',
      ordem: 0,
      icone: 'virus',
    },
    DOENCA: {
      nome: 'Doença',
      tipo: 'OCORRENCIA',
      ordem: 1,
      icone: 'spider',
    },
    INVASORA: {
      nome: 'Invasora',
      tipo: 'OCORRENCIA',
      ordem: 2,
      icone: 'spa',
    },
    NEMATOIDE: {
      nome: 'Nematoide',
      tipo: 'OCORRENCIA',
      icone: 'pastafarianism',
      ordem: 3,
    },
    INIMIGO: {
      nome: 'Inimigo',
      tipo: 'OCORRENCIA',
      ordem: 4,
      icone: 'otter',
    },
    OUTRO: {
      nome: 'Outro',
      tipo: 'OCORRENCIA',
      ordem: 5,
      icone: 'pen-nib',
    },
  };

  static schema = {
    primaryKey: 'id',
    name: 'OcorrenciaCategoria',
    properties: {
      id: 'string',
      nome: 'string',
      tipo: 'string',
      ordem: 'int',
      icone: 'string',
      ocorrencias: 'Ocorrencia[]',
      date: 'date',
    },
  };
}

export {OcorrenciaCategoria};
