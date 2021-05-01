import { v4 as uuidv4 } from 'uuid';
import { FeatureCollection, Polygon } from 'geojson';
import { Talhao } from './TalhaoSchema';
import { Base } from './BaseSchema';

class Fazenda extends Base {
  public id: string;
  public nome: string;
  public numero: string;
  public area: number;
  public theGeom: string;
  public centro: string;
  public talhoes: Talhao[];

  constructor(
    nome: string,
    numero: string,
    area: number,
    theGeom: string,
    centro: string,
    talhoes: Talhao[] = [],
  ) {
    super();
    this.id = uuidv4();
    this.nome = nome;
    this.numero = numero;
    this.area = area;
    this.theGeom = theGeom;
    this.centro = centro;
    this.talhoes = talhoes;
  }

  public getGeoJson(): FeatureCollection<Polygon> {
    return JSON.parse(this.theGeom);
  }

  static schema = {
    primaryKey: 'id',
    name: 'Fazenda',
    properties: {
      id: 'string',
      nome: 'string',
      numero: 'string',
      area: 'float?',
      theGeom: 'string',
      centro: 'string',
      talhoes: 'Talhao[]',
      date: 'date',
    },
  };
}

export { Fazenda };
