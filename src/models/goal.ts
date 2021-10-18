import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IGoal } from '../types'

export default class Goal implements IBaseModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  goal: IGoal;

  constructor(goal: IGoal) {
    this.id = goal._id;
    this.active = goal.active;
    this.description = goal.description;
    this.createdAt = moment(goal.created_at);
    this.goal = goal;
  }
}