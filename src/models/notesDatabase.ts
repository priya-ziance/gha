import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { INotesDatabase, INotesDatabaseModel } from '../types'

export default class NotesDatabase implements IBaseModel {
  active: boolean;
  createdAt: Moment;
  description: string;
  id: string;
  noteDatabase: INotesDatabase;
  updatedAt?: string;

  constructor(notesDatabase: INotesDatabase) {
    this.id = notesDatabase._id;
    this.active = notesDatabase.active;
    this.createdAt = moment(notesDatabase.created_at);
    this.description = notesDatabase.description;
    this.noteDatabase = notesDatabase;
  }

  static fromArray(notesDatabases: INotesDatabase[]): INotesDatabaseModel[] {
    return notesDatabases.map(i => new NotesDatabase(i));
  }
}