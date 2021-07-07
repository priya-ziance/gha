import client from './client';

import Models from '../models';
import { IClient, IClientModel } from '../types';


import Normalizer from './normalizer';
// import * as normalize from './normalize';

//============================= CLIENT API'S=============================
class ClientsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientModel, IClient>(Models.Client)
  }

  async getClients(options = { page: 0 }) {
    const { page } = options;
  
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


//========================================================================

export default (() => ({
  clients: new ClientsApi()
}))()
