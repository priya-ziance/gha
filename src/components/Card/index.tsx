import { Card, CardProps as _CardProps } from '@blueprintjs/core';

const CustomCard = (props: _CardProps) => {
  return (
    <Card {...props} />
  )
}

export type CardProps = _CardProps;

export default CustomCard;
