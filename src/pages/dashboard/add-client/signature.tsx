import * as React from 'react';
import { Overlay } from '@blueprintjs/core';

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

  onClear() {
    if (this.signature.current) {
      this.signature.current.clear();
    }
  }

  onSave() {
    if (this.props.onSave && this.signature.current) {
      this.props.onSave(this.signature.current.toDataURL());
    }

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Overlay isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <div className='add-client__signature'>
          <div style={{
            height: 300,
            width: 500,
            backgroundColor: 'white'
          }}>
            <SignaturePad ref={this.signature} width={500} height={300} style={{ backgroundColor: 'blue' }} options={{minWidth: 1, maxWidth: 2}} />
          </div>
  
          <div className='add-client__signature__actions'>
            <Button onClick={this.onSave}>
              Save
            </Button>
            <Button onClick={this.onClear}>
              Clear
            </Button>
          </div>
        </div>
      </Overlay>
    )
  }
}


const Signature2 = (props: SignatureProps) => {

  
}

export default Signature;