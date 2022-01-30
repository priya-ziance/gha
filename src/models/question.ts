import IBaseModel from './_baseModel';
import { IQuestion, IQuestionModel } from '../types'

export default class Question implements IBaseModel {
  id: string;
  answers: string[];
  type: string;
  selectedAnswers: string[];
  questionValue: string;
  question: IQuestion;

  constructor(question: IQuestion) {
    this.id = question._id;
    this.type = question.type;
    this.answers = question.answers;
    this.selectedAnswers = question.selected_answers;
    this.questionValue = question.question_value;
    this.question = question;
  }

  static fromArray(questions: IQuestion[]): IQuestionModel[] {
    return questions.map(i => new Question(i));
  }
}