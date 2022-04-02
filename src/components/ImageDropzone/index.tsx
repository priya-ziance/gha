import FileDropzone from '../FileDropzone';

import './index.scss';

export interface ImageDropzoneProps {
  files: File[] | [];
  imagesUrls?: string[] | [];
  setFiles: (files: File[]) => void;
}

const ImageDropzone = (props: ImageDropzoneProps) => {
  return (
    <FileDropzone {...props} accept='image/*' />
  );
}

export default ImageDropzone;
