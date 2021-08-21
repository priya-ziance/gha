import { IClient, IFileModel } from '../types'
import models from '../models';

export default class Client {
  id: string;
  name: string;
  client: IClient;
  profilePicture?: IFileModel;

  constructor(client: IClient) {
    this.id = client._id;
    this.name =  `${client.first_name} ${client.last_name}`;
    
    if (client.profile_picture) {
      this.profilePicture = new models.File(client.profile_picture);
    }

    this.client = client;
  }
}