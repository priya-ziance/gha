import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { ISpGoal, IGoalModel } from '../types'
import Goal from './goal';

export default class SpGoal implements IBaseModel {
  address?: string;
  id: string;
  endDate?: Moment;
  startDate?: Moment;
  lastName?: string;
  goal: IGoalModel;
  spGoal: ISpGoal;

  constructor(spGoal: ISpGoal) {
    this.id = spGoal._id;
    this.endDate = spGoal.end_date ? moment(spGoal.end_date) : undefined;
    this.startDate = spGoal.start_date ? moment(spGoal.start_date) : undefined;
    this.goal = new Goal(spGoal.goal)
    this.spGoal = spGoal;
  }
}