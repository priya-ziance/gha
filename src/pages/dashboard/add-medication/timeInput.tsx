import { useEffect, useState } from 'react';
import { Icon, Intent } from '@blueprintjs/core';

import { FormMultiItemSelect } from '../../../components';

import { TIME } from '../../../utils/time';


interface TimeInputProps {
  onNewTimes: (times: string[]) => void;
  times: string[]
}

const TimeInput = (props: TimeInputProps) => {
  const { times: initialTimes, onNewTimes } = props;
  const [selectedTimes, setSelectedTimes] = useState<any>(initialTimes || [])

  useEffect(() => {
    if (onNewTimes) {
      onNewTimes(selectedTimes)
    }
  }, [selectedTimes])

  const onRemoveClient = (val: string) => {
    setSelectedTimes((times: string[]) => {
      const index = times.indexOf(val)
      
      if (index >= 0) {
        times.splice(index, 1)
      }

      return [...times]
    })
  }

  const onClientQueryChange = (q: string) => {
    
  }

  const handleItemChange = (val: string) => {
    setSelectedTimes((times: string[]) => {
      const index = times.indexOf(val)
      
      if (index < 0) {
        times.push(val)
      }

      return [...times]
    })
  }

  const menuRenderer = (item: string) => {
    const index = selectedTimes.indexOf(item)

    if (index >= 0) {
      return (
        <span>
          <Icon icon={'tick'} />
          {' '}
          {item}
        </span>
      )
    }

    return item
  }

  const tagRenderer = (item: string) => {
    return item;
  }

  return (
    <FormMultiItemSelect
      intent={Intent.PRIMARY}
      label={'Time Taken'}
      menuRenderer={menuRenderer}
      formSelectProps={{
        tagRenderer,
        items: TIME,
        onItemSelect: handleItemChange,
        selectedItems: selectedTimes,
        onRemove: onRemoveClient,
        onQueryChange: onClientQueryChange
      }}
    />
  )
}

export default TimeInput;