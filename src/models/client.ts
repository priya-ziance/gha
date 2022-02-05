import IBaseModel from './_baseModel';
import { IClient, IClientModel, IFileModel, ILocationModel, IUserModel } from '../types'
import models from '../models';
import Location from './location';
import User from './user';

export default class Client implements IBaseModel {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  medicaidId?: string;
  client: IClient;
  profilePicture?: IFileModel;
  signature?: IFileModel;
  location?: ILocationModel;
  services: object;
  witnesses?: IUserModel[];
  trainers?: IUserModel[]

  constructor(client: IClient) {
    this.id = client._id;
    this.name =  `${client.first_name} ${client.last_name}`;
    this.firstName = client.first_name;
    this.lastName = client.last_name;
    this.medicaidId = client.medicaid;
    this.services = client.services;
    
    if (client.witnesses) {
      this.witnesses = User.fromArray(client.witnesses)
    }

    if (client.trainers) {
      this.trainers = User.fromArray(client.trainers)
    }
    
    if (client.location) {
      this.location = new Location(client.location);
    }
    
    if (client.profile_picture) {
      this.profilePicture = new models.File(client.profile_picture);
    }

    if (client.signature) {
      this.signature = new models.File(client.signature);
    }

    this.client = client;
  }

  static fromArray(clients: IClient[]): IClientModel[] {
    return clients.map(i => new Client(i));
  }
}