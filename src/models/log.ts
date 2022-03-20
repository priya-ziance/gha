import IBaseModel from './_baseModel';
import Question from './question';
import Client from './client';
import { ILog, IQuestionModel, IClientModel, ILogQuestion, ILogQuestionModel } from '../types'
import moment, { Moment } from 'moment';


class LogQuestion {
  questionId: IQuestionModel;
  selectedAnswer: string;
  logQuestion: ILogQuestion

  constructor(logQuestion: ILogQuestion) {
    this.questionId = new Question(logQuestion.question_id);
    this.selectedAnswer = logQuestion.selected_answer;
    this.logQuestion = logQuestion
  }

  static fromArray(logQuestions: ILogQuestion[]): ILogQuestionModel[] {
    return logQuestions.map(i => new LogQuestion(i));
  }
}

export default class Log implements IBaseModel {
  id: string;
  questions: ILogQuestionModel[];
  type: string;
  client: IClientModel;
  log: ILog;
  createdAt: Moment;

  constructor(log: ILog) {
    this.id = log._id;
    this.type = log.type;
    this.questions = LogQuestion.fromArray(log.questions);
    this.client = new Client(log.client);
    this.log = log;
    this.createdAt = moment(log.created_at)
  }
}