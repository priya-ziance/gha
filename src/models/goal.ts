import moment, { Moment } from 'moment';
import { IGoal } from '../types'

export default class Goal {
  address?: string;
  id: string;
  endDate?: Moment;
  startDate?: Moment;
  lastName?: string;
  goal: IGoal;

  constructor(goal: IGoal) {
    this.id = goal._id;
    this.endDate = goal.end_date ? moment(goal.end_date) : undefined;
    this.startDate = goal.start_date ? moment(goal.start_date) : undefined;
    this.goal = goal;
  }
}