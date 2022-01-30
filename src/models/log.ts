import IBaseModel from './_baseModel';
import Question from './question';
import Client from './client';
import { ILog, IQuestionModel, IClientModel } from '../types'
import moment, { Moment } from 'moment';

export default class Log implements IBaseModel {
  id: string;
  questions: IQuestionModel[];
  type: string;
  client: IClientModel;
  log: ILog;
  createdAt: Moment;

  constructor(log: ILog) {
    this.id = log._id;
    this.type = log.type;
    this.questions = Question.fromArray(log.questions);
    this.client = new Client(log.client);
    this.log = log;
    this.createdAt = moment(log.created_at)
  }
}