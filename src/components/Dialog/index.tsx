import { ReactChild } from 'react';

import { Dialog, DialogProps as _DialogProps } from '@blueprintjs/core';

interface CustomDialogProps {
  children: ReactChild
}

const CustomDialog = (props: _DialogProps | CustomDialogProps) => {
  return (
    <Dialog {...props} />
  )
}

export default CustomDialog;

export type DialogProps = _DialogProps & CustomDialogProps;