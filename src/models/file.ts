import { IFile } from '../types'

export default class File {
  createdAt?: string;
  id: string;
  file: IFile;
  updatedAt?: string;

  constructor(file: IFile) {
    this.id = file._id;
    this.createdAt = file.created_at;
    this.updatedAt = file.updated_at;

    this.file = file;
  }
}