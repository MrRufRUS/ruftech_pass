/**
 * Встроенные уровни логирования.
 */
export type ILogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Функция логирования, принимаемая через DI.
 * Generic `Level` позволяет задать собственный набор уровней.
 */
export type ILogHandler<Level extends string = ILogLevel> = (
  level: Level,
  payload: unknown,
) => void;

/**
 * Интерфейс логгера.
 *
 * @example
 * ```ts
 * // Стандартные уровни
 * const logger: ILogger = createLogger(handler);
 * logger.log('info', { message: 'hello' });
 *
 * // Кастомные уровни
 * type MyLevel = 'trace' | 'fatal';
 * const custom: ILogger<MyLevel> = createLogger<MyLevel>(handler);
 * custom.log('trace', data);
 * ```
 */
export interface ILogger<Level extends string = ILogLevel> {
  log(level: Level, payload: unknown): void;
}

/**
 * Создаёт логгер, делегирующий вызовы переданному handler.
 */
export function createLogger<Level extends string = ILogLevel>(
  handler: ILogHandler<Level>,
): ILogger<Level> {
  return { log: handler };
}
