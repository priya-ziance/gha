import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IClientContact } from '../types'

export default class ClientContact implements IBaseModel {
  address?: string;
  id: string;
  dateOfBirth?: Moment;
  name: string;
  firstName?: string;
  lastName?: string;
  medicalContact?: boolean;
  contactType?: string;
  clientContact: IClientContact;

  constructor(clientContact: IClientContact) {
    this.address =  clientContact.address;
    this.id = clientContact._id;
    this.name =  `${clientContact.first_name} ${clientContact.last_name}`
    this.firstName =  clientContact.first_name;
    this.lastName = clientContact.last_name;
    this.medicalContact = clientContact.medical_contact;
    this.contactType = clientContact.contact_type;
    this.dateOfBirth = clientContact.date_of_birth ? moment(clientContact.date_of_birth) : undefined;

   this.clientContact = clientContact;
  }
}