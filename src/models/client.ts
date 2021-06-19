import { IClient } from '../types'

export default class Client {
  id: string;
  name: string;
  client: IClient;

  constructor(client: IClient) {
    this.id = client._id;
    this.name =  `${client.first_name} ${client.last_name}`

   this.client = client;
  }
}