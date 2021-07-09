import { IClientContact } from '../types'

export default class ClientContact {
  id: string;
  name: string;
  clientContact: IClientContact;

  constructor(clientContact: IClientContact) {
    this.id = clientContact._id;
    this.name =  `${clientContact.first_name} ${clientContact.last_name}`

   this.clientContact = clientContact;
  }
}