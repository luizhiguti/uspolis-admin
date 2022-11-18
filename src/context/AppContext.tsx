import React, { createContext, useState } from 'react';

export interface AppContext {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const DEFAULT_VALUE = { loading: false, setLoading: () => {} };

export const appContext = createContext<AppContext>(DEFAULT_VALUE);

export default function AppContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [loading, setLoading] = useState(false);

  return <appContext.Provider value={{ loading, setLoading }}>{children}</appContext.Provider>;
}
