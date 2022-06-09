import IBaseModel from './_baseModel';
import { ILocation } from '../types'

export default class Location implements IBaseModel {
  createdAt?: string;
  id: string;
  address: string;
  location: ILocation;
  phoneNumber? : string;
  updatedAt?: string;
  city?: string;
  country?: string

  constructor(location: ILocation) {
    this.id = location._id;
    this.address = location.address;
    this.createdAt = location.created_at;
    this.phoneNumber = location.phoneNumber;
    this.updatedAt = location.updated_at;
    this.city = location.city
    this.country = location.country

    this.location = location;
  }
}