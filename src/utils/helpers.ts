//cddddddddddd
import moment from 'moment';

import { TABLE_WIDTH } from './constants';

export const getTableWith = function(widthDecimal: number) {
  return widthDecimal * TABLE_WIDTH;
}

export function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  //Old Code
  //write the ArrayBuffer to a blob, and you're done
  //var bb = new BlobBuilder();
  //bb.append(ab);
  //return bb.getBlob(mimeString);

  //New Code
  return new Blob([ab], {type: mimeString});
}

export const getMomentFormatter = (format: string, placeholder = '') => {
  // note that locale argument comes from locale prop and may be undefined
  return {
      formatDate: (date: any) => moment(date).format(format),
      parseDate: (str: string) => moment(str, format).toDate(),
      placeholder,
  }
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
