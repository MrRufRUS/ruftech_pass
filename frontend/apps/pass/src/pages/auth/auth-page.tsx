import type { FormEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import { LoginRequest, ApiError } from '@ruftech/api'
import { HttpError } from '@ruftech/http-client'
import { useHttpClient } from '@ruftech/http-client/react'
import { InputField } from '@ruftech/ui/input-field'
import { Button } from '@ruftech/ui/button'
import { Alert } from '@ruftech/ui/alert'
import { Heading } from '@ruftech/ui/heading'
import { Logo } from '@ruftech/ui/logo'
import { Spinner } from '@ruftech/ui/spinner'
import { DEFAULT_LOCALE, detectLocale } from '@/shared/i18n'
import { useDocumentMeta } from '@/shared/i18n'
import { login } from '@/shared/auth'
import { AuthHeader } from '@/components/auth-header'
import * as s from './auth-page.css'

type FormState = 'idle' | 'submitting' | 'error'

type FieldErrors = {
  username?: boolean
  password?: boolean
}

export function AuthPage() {
  useDocumentMeta('auth')

  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const locale = detectLocale(pathname)
  const client = useHttpClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { redirect: redirectPath } = useSearch({ strict: false }) as { redirect?: string }

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const raw = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    const errors: FieldErrors = {}
    if (!raw.username.trim()) errors.username = true
    if (!raw.password) errors.password = true

    if (errors.username || errors.password) {
      setFieldErrors(errors)
      return
    }

    const result = LoginRequest.safeParse(raw)
    if (!result.success) {
      setFieldErrors({ username: true, password: true })
      return
    }

    setFieldErrors({})
    setFormState('submitting')
    setErrorMessage('')

    try {
      await login(client, result.data)
      if (redirectPath) {
        navigate({ href: redirectPath })
      } else if (locale === DEFAULT_LOCALE) {
        navigate({ to: '/dashboard' })
      } else {
        navigate({ to: '/$locale/dashboard', params: { locale } })
      }
    } catch (err) {
      setFormState('error')

      if (err instanceof HttpError) {
        if (err.status === 401) {
          setErrorMessage(t('errors.invalidCredentials'))
        } else {
          try {
            const body: unknown = await err.response.json()
            const parsed = ApiError.safeParse(body)
            setErrorMessage(parsed.success ? parsed.data.detail : t('errors.networkError'))
          } catch {
            setErrorMessage(t('errors.networkError'))
          }
        }
      } else {
        setErrorMessage(t('errors.networkError'))
      }
    }
  }

  function handleDismiss() {
    setFormState('idle')
    setErrorMessage('')
  }

  return (
    <>
    <AuthHeader />
    <div className={s.page}>
      <div className={s.container}>
        <div className={s.card}>
          <Logo width={64} />
          <Heading level={1}>{t('title')}</Heading>

          {formState === 'error' && errorMessage && (
            <Alert className={s.alert} variant="error" dismissible onDismiss={handleDismiss}>
              {errorMessage}
            </Alert>
          )}

          <form className={s.form} onSubmit={handleSubmit}>
            <InputField
              label={t('username')}
              name="username"
              type="text"
              placeholder={t('usernamePlaceholder')}
              autocomplete="username"
              error={fieldErrors.username}
            />
            <InputField
              label={t('password')}
              name="password"
              type="password"
              placeholder={t('passwordPlaceholder')}
              autocomplete="current-password"
              error={fieldErrors.password}
            />
            <Button
              className={s.submit}
              variant="successFilled"
              rounded="md"
              type="submit"
              disabled={formState === 'submitting'}
              onClick={() => {}}
            >
              {formState === 'submitting'
                ? <Spinner size="sm" variant="text" />
                : t('submit')}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
