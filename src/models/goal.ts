import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IGoal } from '../types'
import get from 'lodash/get';

export default class Goal implements IBaseModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  goal: IGoal;

  constructor(goal: IGoal) {
    this.id = get(goal, '_id');
    this.active = get(goal, 'active');
    this.description = get(goal, 'description');
    this.createdAt = moment(get(goal, 'created_at'));
    this.goal = goal;
  }
}