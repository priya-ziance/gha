import IBaseModel from './_baseModel';
import Question from './question';
import { ILogTemplate, IQuestionModel, ILogTemplateQuestion, ILogTemplateQuestionModel } from '../types'


class LogTemplateQuestion {
  questionId: IQuestionModel;
  selectedAnswer: string;
  logTemplateQuestion: ILogTemplateQuestion

  constructor(logTemplateQuestion: ILogTemplateQuestion) {
    this.questionId = new Question(logTemplateQuestion.question_id);
    this.selectedAnswer = logTemplateQuestion.selected_answer;
    this.logTemplateQuestion = logTemplateQuestion
  }

  static fromArray(logTemplateQuestions: ILogTemplateQuestion[]): ILogTemplateQuestionModel[] {
    return logTemplateQuestions.map(i => new LogTemplateQuestion(i));
  }
}

export default class LogTemplate implements IBaseModel {
  id: string;
  questions: ILogTemplateQuestionModel[];
  type: string;
  selectedAnswer: string;
  logNotes: string;
  logTemplate: ILogTemplate;

  constructor(logTemplate: ILogTemplate) {
    this.id = logTemplate._id;
    this.type = logTemplate.template_type;
    this.questions = LogTemplateQuestion.fromArray(logTemplate.questions);
    this.logNotes = logTemplate.log_notes;
    this.selectedAnswer = logTemplate.selected_answer;
    this.logTemplate = logTemplate;
  }
}