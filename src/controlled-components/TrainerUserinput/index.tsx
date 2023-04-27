import { useMemo, useEffect, useState } from 'react';
import { Icon, Intent } from '@blueprintjs/core';
import debounce from 'lodash/debounce';

import { IUserModel } from '../../types';

import api from '../../api';

import { FormMultiItemSelect } from '../../components';

import './index.scss'


interface UsersInputProps {
  onNewUsers?: (users: { any: IUserModel }) => void,
  users?: IUserModel[]
}


const usersArrayToObject = (arr: IUserModel[]) => {
  if (Array.isArray(arr)) {
    return Object.assign(
      {},
      ...arr.map(v => ({ [v.id]: v }))
    )
  }
  return {}
}

const TrainerUsersInput = (props: UsersInputProps) => {
  const [selectedUsers, setSelectedUsers] = useState<any>({})
  const [userQuery, setUserQuery] = useState("dddd")
  const [userResults, setUserResults] = useState<any[] | []>([])
  const { users, onNewUsers } = props;
  
  const debouncedCallback = useMemo(() => {
    const debounced = debounce(async () => {
      if (userQuery) {
        try {
          const results = await api.Trainers.getTrainer("h9YwkW4gyE")
          const mapResult= results.map((ele)=>ele.firstName)
          setUserResults(mapResult)
          console.log("result api userResults ",mapResult);
          console.log(" USER result api userResults ",userResults);
        } catch(e: any) {}
      } else {
        setUserResults([])
        debounced.cancel()
      }
    }, 200, { leading: true, trailing: false })
  
    return debounced
  }, [userQuery])


  useEffect(() => {
    if (userResults) {
      setSelectedUsers(usersArrayToObject(userResults))
    }
  }, [])
  console.log("selected user",selectedUsers);
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

  const handleItemChange = (e: IUserModel) => {
    const id = e.id;

    if (!selectedUsers[id]) {
      setSelectedUsers((users: any) => {
        users[id] = e;

        return { ...users }
      })
    }
  }

  const menuRenderer = (item: IUserModel) => {
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
    if (userResults && selectedUsers.userResults) {
      return selectedUsers.userResults.name
    }

    return ''
  }

  return (
    <div className='gha__users-input'>
      <FormMultiItemSelect
        intent={Intent.PRIMARY}
        label={'Select Users'}
        menuRenderer={menuRenderer}
        formSelectProps={{
          tagRenderer,
          items: userResults,
          onItemSelect: handleItemChange,
          selectedItems: Object.keys(userResults),
          onRemove: onRemoveUser,
          onQueryChange: onUserQueryChange
        }}
      />
    </div>
  )
}

export default TrainerUsersInput;