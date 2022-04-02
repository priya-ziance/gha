import { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import get from 'lodash/get';

import FolderFile from '../../assets/svg/folder-file.svg'

import './index.scss';

export interface FileDropzoneProps {
  files: File[] | [];
  imagesUrls?: string[] | [];
  setFiles: (files: File[]) => void;
  accept: string
}


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

const FileDropzone = (props: FileDropzoneProps) => {
  const { files, imagesUrls, setFiles, accept } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept,
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

  let thumbs: any = [];

  if (files && files.length) {
    thumbs = files.map((file: any) => {
      console.log(file)

      return (
        <div key={file.name}>
          <div>
            {file.name.match(/.(jpg|jpeg|png|gif)$/i) ?
              <img
                alt={file.name}
                src={file.preview}
              />
              :
              <img
                alt={file.name}
                src={FolderFile}
                className='file-dropzone__placeholder'
              />
            }
          </div>
        </div>
      )
    });
  } else if (imagesUrls && imagesUrls.length) {
    thumbs = imagesUrls.map((url: any) => {
      console.log(url)
      return (
        <div key={url}>
          <div>
            <img
              alt={url}
              src={url}
            />
          </div>
        </div>
      )
    });
  }

  return (
    <div className="file-dropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {files && !files.length && imagesUrls && !imagesUrls.length ?
          <p>Drag 'n' drop some files here, or click to select files</p>
          :
          <div className='file-dropzone__images-container'>
            {thumbs}
          </div>
        }
      </div>
    </div>
  );
}

export default FileDropzone;
