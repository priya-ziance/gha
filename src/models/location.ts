import { ILocation } from '../types'

export default class Client {
  createdAt?: string;
  id: string;
  address: string;
  location: ILocation;
  updatedAt?: string;

  constructor(location: ILocation) {
    this.id = location._id;
    this.address = location.address;
    this.createdAt = location.created_at;
    this.updatedAt = location.updated_at;

    this.location = location;
  }
}