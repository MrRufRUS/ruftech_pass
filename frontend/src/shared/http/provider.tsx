import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { IHttpClient } from './client';

const HttpClientContext = createContext<IHttpClient | null>(null);

export interface HttpClientProviderProps {
  client: IHttpClient;
  children?: ReactNode;
}

export function HttpClientProvider({ client, children }: HttpClientProviderProps) {
  return (
    <HttpClientContext.Provider value={client}>
      {children}
    </HttpClientContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHttpClient(): IHttpClient {
  const client = useContext(HttpClientContext);

  if (!client) {
    throw new Error('useHttpClient must be used within HttpClientProvider');
  }

  return client;
}
