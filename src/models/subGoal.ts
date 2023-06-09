import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IGoalModel, ISubGoal, ISubGoalModel } from '../types';
import Goal from '../models/goal';

export default class SubGoal implements IBaseModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  subGoal: ISubGoal;
  goal: IGoalModel;

  constructor(subGoal: ISubGoal) {
    this.id = subGoal._id;
    this.active = subGoal.active;
    this.description = subGoal.description;
    this.createdAt = moment(subGoal.created_at);
    this.subGoal = subGoal;
    this.goal = new Goal(subGoal.goal);
  }

  static fromArray(subGoals: ISubGoal[]): ISubGoalModel[] {
    return subGoals.map(i => new SubGoal(i));
  }
}