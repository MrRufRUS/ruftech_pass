import type { FormEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SignupRequest, ApiError } from '@ruftech/api'
import { HttpError } from '@ruftech/http-client'
import { useHttpClient } from '@ruftech/http-client/react'
import { InputField } from '@ruftech/ui/input-field'
import { Button } from '@ruftech/ui/button'
import { Alert } from '@ruftech/ui/alert'
import { Heading } from '@ruftech/ui/heading'
import { Spinner } from '@ruftech/ui/spinner'
import { signup, login } from '@/shared/auth'
import * as s from './auth-page.css'

type FormState = 'idle' | 'submitting' | 'error'

type FieldErrors = {
  username?: boolean
  password?: boolean
  email?: boolean
}

type Props = {
  onSuccess: () => void
  onSwitchMode: () => void
}

export function SignupForm({ onSuccess, onSwitchMode }: Props) {
  const { t } = useTranslation('auth')
  const client = useHttpClient()

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const raw = {
      username: (formData.get('username') as string).trim(),
      password: formData.get('password') as string,
      email: (formData.get('email') as string).trim() || undefined,
    }

    const errors: FieldErrors = {}
    if (!raw.username) errors.username = true
    if (!raw.password) errors.password = true

    if (errors.username || errors.password) {
      setFieldErrors(errors)
      return
    }

    const result = SignupRequest.safeParse(raw)
    if (!result.success) {
      const errs: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors
        errs[field] = true
      }
      setFieldErrors(errs)
      return
    }

    setFieldErrors({})
    setFormState('submitting')
    setErrorMessage('')

    try {
      await signup(client, result.data)
      // Auto-login after successful signup
      await login(client, { username: result.data.username, password: result.data.password })
      onSuccess()
    } catch (err) {
      setFormState('error')

      if (err instanceof HttpError) {
        try {
          const body: unknown = await err.response.json()
          const parsed = ApiError.safeParse(body)
          if (parsed.success) {
            const detail = parsed.data.detail
            if (typeof detail === 'string' && detail.toLowerCase().includes('username')) {
              setErrorMessage(t('errors.usernameExists'))
            } else if (typeof detail === 'string' && detail.toLowerCase().includes('email')) {
              setErrorMessage(t('errors.emailExists'))
            } else {
              setErrorMessage(typeof detail === 'string' ? detail : t('errors.networkError'))
            }
          } else {
            setErrorMessage(t('errors.networkError'))
          }
        } catch {
          setErrorMessage(t('errors.networkError'))
        }
      } else {
        setErrorMessage(t('errors.networkError'))
      }
    }
  }

  return (
    <>
      <Heading level={1}>{t('signupTitle')}</Heading>

      {formState === 'error' && errorMessage && (
        <Alert className={s.alert} variant="error" dismissible onDismiss={() => setFormState('idle')}>
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
          label={t('email')}
          name="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          autocomplete="email"
          error={fieldErrors.email}
        />
        <InputField
          label={t('password')}
          name="password"
          type="password"
          placeholder={t('passwordPlaceholder')}
          autocomplete="new-password"
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
          {formState === 'submitting' ? <Spinner size="sm" variant="text" /> : t('signupSubmit')}
        </Button>
      </form>

      <button type="button" className={s.switchLink} onClick={onSwitchMode}>
        {t('switchToLogin')}
      </button>
    </>
  )
}
