import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IInstruction, IInstructionModel, ITaskModel } from '../types'
import ITask from '../models/task';

export default class Instruction implements IBaseModel {
  active: boolean;
  createdAt: Moment;
  description: string;
  id: string;
  instruction: IInstruction;
  task?: ITaskModel;
  updatedAt?: string;

  constructor(instruction: IInstruction) {
    this.id = instruction._id;
    this.active = instruction.active;
    this.createdAt = moment(instruction.created_at);
    this.description = instruction.description;
    this.updatedAt = instruction.updated_at;
    this.task = instruction.task ? new ITask(instruction.task) : undefined;
    this.instruction = instruction;
  }

  static fromArray(instructions: IInstruction[]): IInstructionModel[] {
    return instructions.map(i => new Instruction(i));
  }
}