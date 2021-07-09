import get from 'lodash/get';

import client from './client';

import Models from '../models';
import {
  ICaseNote,
  ICaseNoteModel,
  IClient,
  IClientModel
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

  async createClient(body = {}) {
    const clientsResult = await client.post('/case_notes', body);
  
    return this.normalizer.normalize(clientsResult.data);
  }

  async updateCaseNote(caseNoteId = '', body = {}) {
    const caseNoteResult = await client.patch(`/case_notes/${caseNoteId}`, body);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }
}


//========================================================================

export default (() => ({
  clients: new ClientsApi(),
  caseNotes: new CaseNotesApi()
}))()
