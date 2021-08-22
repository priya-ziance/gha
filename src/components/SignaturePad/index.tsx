import React from 'react';
import SignaturePad from 'react-signature-pad-wrapper';

const CustomSignaturePad = React.forwardRef((props: any, ref) => {
  return (
    <SignaturePad ref={ref} {...props} />
  )
});

export default CustomSignaturePad;