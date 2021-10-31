import IBaseModel from './_baseModel';
import Behaviour from './behaviour';
import moment, { Moment } from 'moment';
import { IBehaviourModel, IClientBehaviour } from '../types'

export default class ClientBehaviour implements IBaseModel {
  id: string;
  behaviour: IBehaviourModel;
  createdAt: Moment;
  frequency?: number;
  notes: string;
  uri: string;
  clientBehaviour: IClientBehaviour;

  constructor(clientBehaviour: IClientBehaviour) {
    this.id = clientBehaviour._id;
    this.behaviour = new Behaviour(clientBehaviour.behaviour);
    this.frequency = clientBehaviour.frequency;
    this.notes = clientBehaviour.notes;
    this.uri = clientBehaviour.uri;
    this.createdAt = moment(clientBehaviour.created_at);
    this.clientBehaviour = clientBehaviour;
  }
}