import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IBehaviour } from '../types'

export default class Behaviour implements IBaseModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  behaviourDescription: string;
  behaviourType: string;
  behaviour: IBehaviour;

  constructor(behaviour: IBehaviour) {
    this.id = behaviour._id;
    this.active = behaviour.active;
    this.behaviourDescription = behaviour.behaviour_description;
    this.behaviourType = behaviour.behaviour_type;
    this.createdAt = moment(behaviour.created_at);
    this.behaviour = behaviour;
  }
}