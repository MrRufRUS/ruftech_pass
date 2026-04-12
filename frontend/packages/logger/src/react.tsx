import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { ILogger } from './logger'

const LoggerContext = createContext<ILogger | null>(null)

export interface LoggerProviderProps {
  logger: ILogger
  children?: ReactNode
}

export function LoggerProvider({ logger, children }: LoggerProviderProps) {
  return (
    <LoggerContext.Provider value={logger}>
      {children}
    </LoggerContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLogger(): ILogger {
  const logger = useContext(LoggerContext)

  if (!logger) {
    throw new Error('useLogger must be used within LoggerProvider')
  }

  return logger
}
