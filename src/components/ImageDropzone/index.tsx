import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import get from 'lodash/get';

import './index.scss';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  height: '100%',
  justifyContent: 'center'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const ImageDropzone = (props: any) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    if (files) {
      files.forEach(file => {
        if (file) {
          URL.revokeObjectURL(get(file, 'preview', ''))
        }
      });
    }
  }, [files]);

  const style: any = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  let thumbs;

  if (files) {
    thumbs = files.map((file: any) => (
      <div key={file.name}>
        <div>
          <img
            alt={file.name}
            src={file.preview}
          />
        </div>
      </div>
    ));
  }

  return (
    <div className="image-dropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {files && !files.length ?
          <p>Drag 'n' drop some files here, or click to select files</p>
          :
          <div className='image-dropzone__images-container'>
            {thumbs}
          </div>
        }
      </div>
    </div>
  );
}

export default ImageDropzone;
