import moment, { Moment } from 'moment';
import { IGoalModel, IInstructionModel, ISubGoalModel, ITask } from '../types';
import Goal from '../models/goal';
import SubGoal from '../models/subGoal';
import Instruction from '../models/instruction';

export default class Task {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  instructions: IInstructionModel[];
  subGoal?: ISubGoalModel;
  task: ITask;
  goal: IGoalModel;

  constructor(task: ITask) {
    this.id = task._id;
    this.active = task.active;
    this.description = task.description;
    this.createdAt = moment(task.created_at);
    this.instructions = task.instructions ? Instruction.fromArray(task.instructions) : []
    this.task = task;
    this.goal = new Goal(task.goal);
    this.subGoal =  task.sub_goal ? new SubGoal(task.sub_goal) : undefined;
  }
}