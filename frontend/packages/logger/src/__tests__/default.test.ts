import { describe, it, expect, vi } from 'vitest'
import { DefaultLogger } from '../default'

describe('DefaultLogger', () => {
  it('maps log levels to corresponding console methods', () => {
    const logger = DefaultLogger.create()

    const spyDebug = vi.spyOn(console, 'debug').mockImplementation(() => {})
    const spyInfo = vi.spyOn(console, 'info').mockImplementation(() => {})
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {})

    logger.log('debug', 'dbg')
    logger.log('info', 'inf')
    logger.log('warn', 'wrn')
    logger.log('error', 'err')

    expect(spyDebug).toHaveBeenCalledWith('dbg')
    expect(spyInfo).toHaveBeenCalledWith('inf')
    expect(spyWarn).toHaveBeenCalledWith('wrn')
    expect(spyError).toHaveBeenCalledWith('err')

    spyDebug.mockRestore()
    spyInfo.mockRestore()
    spyWarn.mockRestore()
    spyError.mockRestore()
  })
})
