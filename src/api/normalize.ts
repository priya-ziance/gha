import Client from '../models/client';
import { IClient } from '../types';

export const clientArray = (clients = []) => {
  return clients.map(client => new Client(client))
}

export const client = (client: IClient) => {
  return new Client(client);
}