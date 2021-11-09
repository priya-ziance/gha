import { CLIENT_FIELDS_TYPE } from '../../../types';

export interface IDialog {
  isOpen: boolean;
  handleClose: () => void;
  values?: {
    [key in CLIENT_FIELDS_TYPE]?: string
  }
}
