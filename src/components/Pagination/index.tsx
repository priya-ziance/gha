import { Button } from '..';

import './index.scss';

export interface PaginationProps {
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  page?: number;
}

const Pagination = (props: PaginationProps) => {
  const { hasNextPage, hasPrevPage, onNextPage, onPrevPage } = props;

  return (
    <div className='gha__pagination'>
      <Button icon='chevron-left' disabled={!hasPrevPage} onClick={onPrevPage}>
        Prev
      </Button>

      <Button rightIcon='chevron-right' disabled={!hasNextPage} onClick={onNextPage}>
        Next
      </Button>
    </div>
  )
}

export default Pagination;