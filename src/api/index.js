import client from './client';

import * as normalize from './normalize';

//============================= CLIENT API'S=============================
function ClientsApi() {}

ClientsApi.prototype.getClients = async function(options = {}) {
  const { page = 0 } = options;

  const clientsResult = await client.get(`/clients?page=${page}`);

  return normalize.clientArray(clientsResult.data.contents);
}


//========================================================================

export default (() => ({
  clients: new ClientsApi()
}))()
