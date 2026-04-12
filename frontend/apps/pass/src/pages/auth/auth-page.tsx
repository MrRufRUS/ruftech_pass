import { useState } from 'react'
import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import { Logo } from '@ruftech/ui/logo'
import { DEFAULT_LOCALE, detectLocale, useDocumentMeta } from '@/shared/i18n'
import { AuthHeader } from '@/components/auth-header'
import { LoginForm } from './auth-login-form'
import { SignupForm } from './auth-signup-form'
import * as s from './auth-page.css'

type Mode = 'login' | 'signup'

export function AuthPage() {
  useDocumentMeta('auth')

  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const locale = detectLocale(pathname)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { redirect: redirectPath } = useSearch({ strict: false }) as { redirect?: string }

  const [mode, setMode] = useState<Mode>('login')

  function navigateAfterAuth() {
    if (redirectPath) {
      navigate({ href: redirectPath })
    } else if (locale === DEFAULT_LOCALE) {
      navigate({ to: '/dashboard' })
    } else {
      navigate({ to: '/$locale/dashboard', params: { locale } })
    }
  }

  return (
    <>
      <AuthHeader />
      <div className={s.page}>
        <div className={s.container}>
          <div className={s.card}>
            <Logo width={64} />
            {mode === 'login'
              ? (
                  <LoginForm
                    onSuccess={navigateAfterAuth}
                    onSwitchMode={() => setMode('signup')}
                  />
                )
              : (
                  <SignupForm
                    onSuccess={navigateAfterAuth}
                    onSwitchMode={() => setMode('login')}
                  />
                )}
          </div>
        </div>
      </div>
    </>
  )
}
