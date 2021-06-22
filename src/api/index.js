import client from './client';

import * as normalize from './normalize';

//============================= CLIENT API'S=============================
function ClientsApi() {}

ClientsApi.prototype.getClients = async function(options = {}) {
  const { page = 0 } = options;

  const clientsResult = await client.get(`/clients?page=${page}`);

  return normalize.clientArray(clientsResult.data.contents);
}

ClientsApi.prototype.createClient = async function(body = {}) {
  const clientsResult = await client.post('/clients', body);

  return normalize.client(clientsResult.data);
}


//========================================================================

export default (() => ({
  clients: new ClientsApi()
}))()
