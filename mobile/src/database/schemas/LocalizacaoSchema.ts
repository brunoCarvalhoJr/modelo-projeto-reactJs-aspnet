import {v4 as uuidv4} from 'uuid';
import {Base} from './BaseSchema';
import {Formulario} from './FormularioSchema';

class Localizacao extends Base {
  public id: string;
  public tipo!: string;
  public theGeom!: string | undefined;
  public status: string;
  public talhao!: string;
  public formularios: Formulario[] = [];

  constructor() {
    super();
    this.id = uuidv4();
    this.status = Localizacao.STATUS.PENDENTE;
  }

  static CODIGO = {
    ANOTACAO: 'ANOTACAO',
    OCORRENCIA: 'OCORRENCIA',
  };

  static STATUS = {
    PENDENTE: 'PENDENTE',
    CONCLUIDO: 'CONCLUIDO',
  };

  static schema = {
    primaryKey: 'id',
    name: 'Localizacao',
    properties: {
      id: 'string',
      tipo: 'string',
      theGeom: 'string',
      status: 'string',
      talhao: 'string',
      formularios: 'Formulario[]',
      date: 'date',
    },
  };
}

export {Localizacao};
