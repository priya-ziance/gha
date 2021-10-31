import moment, { Moment } from 'moment';
import get from 'lodash/get'

import IBaseModel from './_baseModel';
import { ISpGoal, IGoalModel, ISubGoalModel } from '../types'
import Goal from './goal';
import SubGoal from './subGoal';

export default class SpGoal implements IBaseModel {
  active: boolean;
  address?: string;
  id: string;
  endDate?: Moment;
  startDate?: Moment;
  lastName?: string;
  goal: IGoalModel;
  notes: string;
  spGoal: ISpGoal;
  subGoals: ISubGoalModel[];
  createdAt: Moment;

  constructor(spGoal: ISpGoal) {
    this.active = spGoal.active;
    this.id = get(spGoal, '_id', '');
    this.endDate = spGoal.end_date ? moment(spGoal.end_date) : undefined;
    this.startDate = spGoal.start_date ? moment(spGoal.start_date) : undefined;
    this.createdAt = moment(spGoal.created_at);
    this.goal = new Goal(spGoal.goal)
    this.notes = spGoal.notes;
    this.spGoal = spGoal;
    this.subGoals = SubGoal.fromArray(spGoal.sub_goals);
  }
}