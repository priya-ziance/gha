import Client from '../models/client';

export const clientArray = (clients = []) => {
  return clients.map(client => new Client(client))
}