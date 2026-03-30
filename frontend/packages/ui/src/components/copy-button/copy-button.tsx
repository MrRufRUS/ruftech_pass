import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import { Copy } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './copy-button.css'

type State = 'idle' | 'copied'

export type CopyButtonProps = IBaseProps & ComponentPropsWithRef<'button'> & {
  copyTargetSelector: string
  labelCopy?: string
  labelCopied?: string
}

export const CopyButton: FC<CopyButtonProps> = ({
  className,
  style,
  copyTargetSelector,
  labelCopy = 'Скопировать',
  labelCopied = 'Скопировано',
  ref,
  ...props
}) => {
  const [state, setState] = useState<State>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleClick = useCallback(async () => {
    const target = document.querySelector(copyTargetSelector)
    if (!target) return

    const text = target.textContent ?? ''
    await navigator.clipboard.writeText(text)

    setState('copied')

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setState('idle'), 2000)
  }, [copyTargetSelector])

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(s.copyButton, state === 'copied' && s.active, className)}
      style={style}
      onClick={handleClick}
      {...props}
    >
      <Copy className={s.copyIcon} />
      <span>{state === 'copied' ? labelCopied : labelCopy}</span>
    </button>
  )
}
