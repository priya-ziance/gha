import IBaseModel from './_baseModel';
import { IClient, IFileModel } from '../types'
import models from '../models';

export default class Client implements IBaseModel {
  id: string;
  name: string;
  client: IClient;
  profilePicture?: IFileModel;
  signature?: IFileModel;

  constructor(client: IClient) {
    this.id = client._id;
    this.name =  `${client.first_name} ${client.last_name}`;
    
    if (client.profile_picture) {
      this.profilePicture = new models.File(client.profile_picture);
    }

    if (client.signature) {
      this.signature = new models.File(client.signature);
    }


    this.client = client;
  }
}