import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IUser, IUserModel } from '../types'

export default class User implements IBaseModel {
  createdAt: Moment;
  email: string;
  id: string;
  name: string;
  type: string;
  user: IUser;

  constructor(user: IUser) {
    this.id = user._id;
    this.createdAt = moment(user.created_at);
    this.email = user.email;
    this.type = user.type;
    this.name = user.name;
    this.user = user;
  }

  static fromArray(users: IUser[]): IUserModel[] {
    return users.map(i => new User(i));
  }
}