import { IClientContact } from '../types'

export default class ClientContact {
  id: string;
  name: string;
  clientContact: IClientContact;

  constructor(client: IClientContact) {
    this.id = client._id;
    this.name =  `${client.first_name} ${client.last_name}`

   this.clientContact = client;
  }
}