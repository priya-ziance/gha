import { useContext } from 'react';

import DimensionsContext from '../../contexts/dimensions';

import { DeviceType } from '../../types';

interface EllipsisProps {
  breakpoints: {
    [key in DeviceType]?: number;
  },
  text?: string
}

const truncate = (text: string = '', count: number) => {
  if (text.length <= count) {
    return text;
  }

  return `${text.substring(0, count).trim()}...`;
}

const Ellipsis = (props: EllipsisProps) => {
  const { deviceType } = useContext(DimensionsContext);

  let truncatedText = '';
  let count = 0;

  if (!props.text) return (<></>);

  if (props.breakpoints) {
    count = props.breakpoints[deviceType] || 0;
  }

  truncatedText = truncate(props.text, count);

  return (
    <>
      {truncatedText}
    </>
  )
  
};

export default Ellipsis;