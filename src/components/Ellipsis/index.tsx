import { useContext } from 'react';

import DimensionsContext from '../../contexts/dimensions';

interface EllipsisProps {
  breakpoints: {
    md?: number;
    sm?: number;
    xs?: number;
  },
  count: number,
  text: string
}

const truncate = (text: string, count: number) => {
  if (text.length <= count) {
    return text;
  }

  return `${text.substring(0, count).trim()}...`;
}

const Ellipsis = (props: EllipsisProps) => {
  const { deviceType } = useContext(DimensionsContext);

  let count = 0;

  if (props.breakpoints) {
    count = props.breakpoints[deviceType] || 0;
  }

  return truncate(props.text, count);
  
};

export default Ellipsis;