import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { ISpGoal } from '../types'

export default class SpGoal implements IBaseModel {
  address?: string;
  id: string;
  endDate?: Moment;
  startDate?: Moment;
  lastName?: string;
  goal: ISpGoal;

  constructor(goal: ISpGoal) {
    this.id = goal._id;
    this.endDate = goal.end_date ? moment(goal.end_date) : undefined;
    this.startDate = goal.start_date ? moment(goal.start_date) : undefined;
    this.goal = goal;
  }
}