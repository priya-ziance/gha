import { useMemo, useEffect, useState } from 'react';
import { Icon, Intent } from '@blueprintjs/core';
import debounce from 'lodash/debounce';

import { IClientContactModel } from '../../types';

import api from '../../api';

import { FormMultiItemSelect } from '../../components';

import './index.scss'


interface ContactsInputProps {
  onNewUsers?: (users: { any: IClientContactModel }) => void,
  users?: IClientContactModel[]
}


const usersArrayToObject = (arr: IClientContactModel[]) => {
  if (Array.isArray(arr)) {
    return Object.assign(
      {},
      ...arr.map(v => ({ [v.id]: v }))
    )
  }

  return {}
}

const ContactsInput = (props: ContactsInputProps) => {
  const [selectedUsers, setSelectedUsers] = useState<any>({})
  const [userQuery, setUserQuery] = useState('')
  const [userResults, setUserResults] = useState<IClientContactModel[] | []>([])
  const { users, onNewUsers } = props;
  
  const debouncedCallback = useMemo(() => {
    const debounced = debounce(async () => {
      if (userQuery) {
        try {
          const results = await api.clientContacts.search(userQuery)
          setUserResults(results)
        } catch(e: any) {}
      } else {
        setUserResults([])
        debounced.cancel()
      }
    }, 200, { leading: true, trailing: false })

    return debounced
  }, [userQuery])

  useEffect(() => {
    if (users) {
      setSelectedUsers(usersArrayToObject(users))
    }
  }, [])

  useEffect(() => {
    debouncedCallback()
  }, [userQuery, debouncedCallback])

  useEffect(() => {
    if (onNewUsers) {
      onNewUsers(selectedUsers)
    }
  }, [selectedUsers])

  const onRemoveUser = (val: any) => {
    setSelectedUsers((users: any) => {
      delete users[val];

      return {...users}
    })
  }

  const onUserQueryChange = (q: string) => {
    setUserQuery(q)
  }

  const handleItemChange = (e: IClientContactModel) => {
    const id = e.id;

    if (!selectedUsers[id]) {
      setSelectedUsers((users: any) => {
        users[id] = e;

        return { ...users }
      })
    }
  }

  const menuRenderer = (item: any) => {
    if (selectedUsers[item.id]) {
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
    if (item && selectedUsers[item]) {
      return selectedUsers[item].name
    }

    return ''
  }

  return (
    <div className='gha__client-contact-input'>
      <FormMultiItemSelect
        intent={Intent.PRIMARY}
        menuRenderer={menuRenderer}
        formSelectProps={{
          tagRenderer,
          items: userResults,
          onItemSelect: handleItemChange,
          selectedItems: Object.keys(selectedUsers),
          onRemove: onRemoveUser,
          onQueryChange: onUserQueryChange
        }}
      />
    </div>
  )
}

export default ContactsInput;