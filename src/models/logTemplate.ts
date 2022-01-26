import IBaseModel from './_baseModel';
import Question from './question';
import { ILogTemplate, IQuestionModel } from '../types'

export default class LogTemplate implements IBaseModel {
  id: string;
  questions: IQuestionModel[];
  type: string;
  logTemplate: ILogTemplate;

  constructor(logTemplate: ILogTemplate) {
    this.id = logTemplate._id;
    this.type = logTemplate.type;
    this.questions = Question.fromArray(logTemplate.questions);
    this.logTemplate = logTemplate;
  }
}