import { useMemo, useEffect, useState } from 'react';
import { Icon, Intent } from '@blueprintjs/core';
import debounce from 'lodash/debounce';

import { IClientModel } from '../../types';

import api from '../../api';

import { FormMultiItemSelect } from '../../components';


interface ClientsInputProps {
  onNewClients?: (clients: { any: IClientModel }) => void,
  clients?: IClientModel[]
}


const clientsArrayToObject = (arr: IClientModel[]) => {
  return Object.assign(
    {},
    ...arr.map(v => ({ [v.id]: v }))
  )
}

const ClientsInput = (props: ClientsInputProps) => {
  const [selectedClients, setSelectedClients] = useState<any>({})
  const [clientQuery, setClientQuery] = useState('')
  const [clientResults, setClientResults] = useState<IClientModel[] | []>([])
  const { clients, onNewClients } = props;
  
  const debouncedCallback = useMemo(() => {
    const debounced = debounce(async () => {
      if (clientQuery) {
        try {
          const results = await api.clients.searchClients(clientQuery)
          setClientResults(results)
        } catch(e) {}
      } else {
        setClientResults([])
        debounced.cancel()
      }
    }, 200, { leading: true, trailing: false })

    return debounced
  }, [clientQuery])

  useEffect(() => {
    if (clients) {
      setSelectedClients(clientsArrayToObject(clients))
    }
  }, [])

  useEffect(() => {
    debouncedCallback()
  }, [clientQuery, debouncedCallback])

  useEffect(() => {
    if (onNewClients) {
      onNewClients(selectedClients)
    }
  }, [selectedClients])

  const onRemoveClient = (val: any) => {
    setSelectedClients((clients: any) => {
      delete clients[val];

      return {...clients}
    })
  }

  const onClientQueryChange = (q: string) => {
    setClientQuery(q)
  }

  const handleItemChange = (e: IClientModel) => {
    const id = e.id;

    if (!selectedClients[id]) {
      setSelectedClients((clients: any) => {
        clients[id] = e;

        return { ...clients }
      })
    }
  }

  const menuRenderer = (item: IClientModel) => {
    if (selectedClients[item.id]) {
      return (
        <span>
          <Icon icon={'tick'} />
          {' '}
          {item.name}
        </span>
      )
    }

    return item.name
  }

  const tagRenderer = (item: string) => {
    if (item && selectedClients[item]) {
      return selectedClients[item].name
    }

    return ''
  }

  return (
    <FormMultiItemSelect
      intent={Intent.PRIMARY}
      label={'Select Clients'}
      menuRenderer={menuRenderer}
      formSelectProps={{
        tagRenderer,
        items: clientResults,
        onItemSelect: handleItemChange,
        selectedItems: Object.keys(selectedClients),
        onRemove: onRemoveClient,
        onQueryChange: onClientQueryChange
      }}
    />
  )
}

export default ClientsInput;