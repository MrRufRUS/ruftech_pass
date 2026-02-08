export type ILogLevel = 'debug' | 'info' | 'warn' | 'error'

export type ILogHandler<Level extends string = ILogLevel> = (
  level: Level,
  payload: unknown,
) => void

export interface ILogger<Level extends string = ILogLevel> {
  log(level: Level, payload: unknown): void
}

export function createLogger<Level extends string = ILogLevel>(
  handler: ILogHandler<Level>,
): ILogger<Level> {
  return { log: handler }
}
