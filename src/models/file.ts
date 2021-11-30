import IBaseModel from './_baseModel';
import { IFile } from '../types'

import api from '../api';

export default class File implements IBaseModel {
  createdAt?: string;
  id: string;
  file: IFile;
  publicUrl?: string;
  url?: string;
  key?: string;
  updatedAt?: string;

  constructor(file: IFile) {
    this.id = file._id;
    this.createdAt = file.created_at;
    this.updatedAt = file.updated_at;
    this.url = file.url;
    this.key = file.key;
    this.file = file;
  }

  async loadFile() {
    const loadedFile = await api.files.getFile(this.id);
    this.setPublicUrl(loadedFile.url);
  }

  setPublicUrl(url?: string) {
    this.publicUrl = url;
  }
}