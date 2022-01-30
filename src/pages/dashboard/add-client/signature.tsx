import * as React from 'react';
import { Intent, Overlay } from '@blueprintjs/core';

import { Button, SignaturePad } from '../../../components';

import './index.scss';

export interface SignatureProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (dataUrl: string) => void
}

class Signature extends React.Component<SignatureProps> {
  private signature = React.createRef<any>()

  constructor(props: SignatureProps) {
    super(props)

    this.onClear = this.onClear.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onClear(e: any) {
    if (this.signature.current) {
      this.signature.current.clear();
    }

    e.stopPropagation();
  }

  onSave(e: any) {
    if (this.props.onSave && this.signature.current) {
      this.props.onSave(this.signature.current.toDataURL());
    }

    if (this.props.onClose) {
      this.props.onClose();
    }

    e.stopPropagation();
  }

  onClickContainer(event: any) {
    event.stopPropagation()
  }

  render() {
    return (
      <Overlay isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <div className='add-client__signature' onClick={this.props.onClose}>
          <div className='add-client__signature__container' onClick={this.onClickContainer}>
            <SignaturePad ref={this.signature} style={{ backgroundColor: 'blue' }} />
          </div>
  
          <div className='add-client__signature__actions'>
            <Button intent={Intent.PRIMARY} large onClick={this.onSave}>
              Save
            </Button>
            <Button large onClick={this.onClear}>
              Clear
            </Button>
          </div>
        </div>
      </Overlay>
    )
  }
}

export default Signature;