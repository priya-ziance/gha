import { ToastProvider } from 'react-toast-notifications';

function Contexts({ children }) {

  return (
    <ToastProvider>
      {children}
    </ToastProvider> 
  );
}

export default Contexts;
