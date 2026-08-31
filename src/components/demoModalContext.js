import { createContext, useContext } from 'react';

export const DemoModalContext = createContext({ open: () => {}, close: () => {} });

export function useDemoModal() {
  return useContext(DemoModalContext);
}
