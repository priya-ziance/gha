import IBaseModel from './_baseModel';
import { IBehaviourAssignment } from '../types'
import Behaviour from './behaviour';

export default class BehaviourAssignment implements IBaseModel {
  id: string;
  behaviours: Behaviour[];
  behaviourAssignment: IBehaviourAssignment;

  constructor(behaviourAssignment: IBehaviourAssignment) {
    this.id = behaviourAssignment.id;
    this.behaviours = behaviourAssignment.behaviours?.map(behaviour => new Behaviour(behaviour));
    this.behaviourAssignment = behaviourAssignment;
  }
}