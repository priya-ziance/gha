import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IPlaceDatabase, IPlaceDatabaseModel } from '../types'

export default class PlaceDatabase implements IBaseModel {
  active: boolean;
  createdAt: Moment;
  description: string;
  id: string;
  placeDatabase: IPlaceDatabase;
  updatedAt?: string;

  constructor(placeDatabase: IPlaceDatabase) {
    this.id = placeDatabase._id;
    this.active = placeDatabase.active;
    this.createdAt = moment(placeDatabase.created_at);
    this.description = placeDatabase.description;
    this.placeDatabase = placeDatabase;
  }

  static fromArray(placeDatabases: IPlaceDatabase[]): IPlaceDatabaseModel[] {
    return placeDatabases.map(i => new PlaceDatabase(i));
  }
}