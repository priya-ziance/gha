import { Intent } from '@blueprintjs/core';
import React, { Fragment, useEffect, useContext, useRef, useState } from 'react';
import ToastsContext from '../../contexts/toasts';


const ConnectivityListener = () => {
  useConnectivityListener();
  return null;
};

export default ConnectivityListener ;

export function useConnectivityListener() {
  const [isOnline, setOnline] = useState(
    window ? window.navigator.onLine : false
  );
  const toastId = useRef(null);
  const { addToast, removeToast } = useContext(ToastsContext)

  useEffect(() => {
    const onlineHandler = () => setOnline(true);
    const offlineHandler = () => setOnline(false);

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  useUpdateEffect(
    () => {
      const content = (
        <Fragment>
          <strong>{isOnline ? 'Online' : 'Offline'}</strong>
          <div>
            {isOnline
              ? 'Editing is available again'
              : 'Changes you make may not be saved'}
          </div>
        </Fragment>
      );

      removeToast(toastId.current)

      // add the applicable toast
      toastId.current = addToast(
        {
          message: content,
          timeout: isOnline ? 5000: 0, // 0 will deactivate timeout
          intent: isOnline ? Intent.PRIMARY : Intent.WARNING
        }
      );
    },
    [isOnline]
  );
}

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 */
function useUpdateEffect(effect, deps = []) {
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      effect();
    }
  }, deps);
}