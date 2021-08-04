import get from 'lodash/get';

import { PermissionsModuleType } from '../types';


const modules: PermissionsModuleType[] = ['case_notes', 'client_contacts', 'info'];

type PermissionTypesType = {
  [key in PermissionsModuleType]?: {
    read: boolean,
    write: boolean
  }
}

export const compilePermissions = function(permissions: string[]) {
  let permissionTypes: PermissionTypesType = Object.assign({}, ...modules.map(module => {
    return {
      [module]: {
        read: false,
        write: false
      }
    }
  }))

  for (let i = 0; i < permissions.length; i++) {
    const permission = permissions[i];

    let parts = permission.split(':');

    const readWritePermission = parts[0];
    const module = parts[1];

    if (get(permissionTypes, module)) {
      const permissionType: any = get(permissionTypes, module);

      if (readWritePermission === 'read') {
        permissionType[ACCESS_TYPES.READ] = true;
      } else if (readWritePermission === 'write') {
        permissionType[ACCESS_TYPES.WRITE] = true;
      }
    }
  }

  return permissionTypes
}

export const ACCESS_TYPES = {
  READ: 'read',
  WRITE: 'write'
}
