import { ToastProvider } from 'react-toast-notifications';
import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";

import { DimensionsProvider } from './dimensions';

function handleResize(entries: IResizeEntry[]) {
  console.log(entries.map(e => `${e.contentRect.width} x ${e.contentRect.height}`));
}

function Contexts({ children }) {

  return (
    <ToastProvider>
      <DimensionsProvider
        value={{
          deviceType: 'sm'
        }}
      >
        <ResizeSensor onResize={handleResize}>
          {children}
        </ResizeSensor>
      </DimensionsProvider>
    </ToastProvider> 
  );
}

export default Contexts;
