import get from 'lodash/get';

import client from './client';

import Models from '../models';
import {
  ICaseNote,
  ICaseNoteModel,
  IClient,
  IClientModel,
  IClientContact,
  IClientContactModel,
  ILocation,
  ILocationModel
} from '../types';


import Normalizer from './normalizer';

type OPTIONS_TYPE = {
  page?: number;
  pageSize?: number;
}

//============================= CLIENT API'S=============================
class ClientsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientModel, IClient>(Models.Client)
  }

  async getClients(options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const clientsResult = await client.get(`/clients?page=${page}`);
  
    return this.normalizer.normalizeArray(clientsResult.data.contents);
  }

  async getClient(clientId: string) {
    const clientResult = await client.get(`/clients/${clientId}`);
  
    return this.normalizer.normalize(clientResult.data);
  }

  async createClient(body = {}) {
    const clientsResult = await client.post('/clients', body);
  
    return this.normalizer.normalize(clientsResult.data);
  }

  async updateClient(body = {}) {
    const clientsResult = await client.patch('/clients', body);
  
    return this.normalizer.normalize(clientsResult.data);
  }
}

//============================= CASE NOTE API'S=============================
class CaseNotesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ICaseNoteModel, ICaseNote>(Models.CaseNote)
  }

  async getCaseNotes(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const caseNotesResult = await client.get(`/case_notes`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(caseNotesResult.data.contents);
  }

  async getCaseNote(caseNoteId: string) {
    const caseNoteResult = await client.get(`/case_notes/${caseNoteId}`);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }

  async createCaseNote(body = {}) {
    const caseNoteResult = await client.post('/case_notes', body);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }

  async updateCaseNote(caseNoteId = '', body = {}) {
    const caseNoteResult = await client.patch(`/case_notes/${caseNoteId}`, body);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }
}

//============================= CLIENT CONTACT API'S========================
class ClientContactApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientContactModel, IClientContact>(Models.ClientContact)
  }

  async getClientContacts(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const clientContactsResult = await client.get(`/client_contacts`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(clientContactsResult.data.contents);
  }

  async createClientContact(body = {}) {
    const clientContactResult = await client.post('/client_contacts', body);
  
    return this.normalizer.normalize(clientContactResult.data);
  }

  async updateClientContact(clientContactId = '', body = {}) {
    const clientContactResult = await client.patch(`/client_contacts/${clientContactId}`, body);
  
    return this.normalizer.normalize(clientContactResult.data);
  }
}

//============================= LOCATION API'S===========================
class LocationApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ILocationModel, ILocation>(Models.Location)
  }

  async getLocations() {
    const locationsResult = await client.get('/locations');
  
    return this.normalizer.normalizeArray(locationsResult.data.contents);
  }
}


//========================================================================

export default (() => ({
  clients: new ClientsApi(),
  clientContacts: new ClientContactApi(),
  caseNotes: new CaseNotesApi(),
  locations: new LocationApi()
}))()
