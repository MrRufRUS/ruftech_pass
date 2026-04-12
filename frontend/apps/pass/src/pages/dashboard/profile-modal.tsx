import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { HttpError } from '@ruftech/http-client'
import { useHttpClient } from '@ruftech/http-client/react'
import { Modal } from '@ruftech/ui/modal'
import { InputField } from '@ruftech/ui/input-field'
import { Button } from '@ruftech/ui/button'
import { Alert } from '@ruftech/ui/alert'
import { Spinner } from '@ruftech/ui/spinner'
import { useLocale, DEFAULT_LOCALE } from '@/shared/i18n'
import { updateMe, deleteAccount } from '@/shared/auth'
import * as s from './profile-modal.css'

type Props = {
  open: boolean
  onClose: () => void
}

type SectionState = 'idle' | 'submitting' | 'success' | 'error'

export const ProfileModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation('dashboard')
  const client = useHttpClient()
  const navigate = useNavigate()
  const locale = useLocale()

  const [emailState, setEmailState] = useState<SectionState>('idle')
  const [emailError, setEmailError] = useState('')

  const [passwordState, setPasswordState] = useState<SectionState>('idle')
  const [passwordError, setPasswordError] = useState('')

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  function handleClose() {
    setEmailState('idle')
    setEmailError('')
    setPasswordState('idle')
    setPasswordError('')
    setShowDeleteConfirm(false)
    onClose()
  }

  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = (new FormData(e.currentTarget).get('email') as string).trim()
    if (!email) return

    setEmailState('submitting')
    setEmailError('')
    try {
      await updateMe(client, { email })
      setEmailState('success')
    } catch (err) {
      setEmailState('error')
      setEmailError(err instanceof HttpError ? t('profile.errors.network') : t('profile.errors.network'))
    }
  }

  async function handlePasswordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const password = new FormData(e.currentTarget).get('password') as string
    if (!password) return

    setPasswordState('submitting')
    setPasswordError('')
    try {
      await updateMe(client, { password })
      // Backend deletes cookie on password change — redirect to login
      const authTo = locale === DEFAULT_LOCALE ? '/auth' : `/${locale}/auth`
      navigate({ href: authTo })
    } catch (err) {
      setPasswordState('error')
      setPasswordError(err instanceof HttpError ? t('profile.errors.network') : t('profile.errors.network'))
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    try {
      await deleteAccount(client)
      const homeTo = locale === DEFAULT_LOCALE ? '/' : `/${locale}`
      navigate({ href: homeTo })
    } catch {
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (!open) return null

  return (
    <Modal open={open} onClose={handleClose} title={t('profile.title')}>
      <Modal.Body>
        {/* Change Email */}
        <div className={s.section}>
          <p className={s.sectionTitle}>{t('profile.changeEmail')}</p>
          {emailState === 'success' && (
            <p className={s.successText}>{t('profile.success.emailUpdated')}</p>
          )}
          {emailState === 'error' && emailError && (
            <Alert variant="error" dismissible onDismiss={() => setEmailState('idle')}>
              {emailError}
            </Alert>
          )}
          <form onSubmit={handleEmailSubmit}>
            <InputField
              label={t('profile.newEmail')}
              name="email"
              type="email"
              placeholder={t('profile.newEmailPlaceholder')}
              autocomplete="email"
            />
            <Button
              variant="successFilled"
              rounded="md"
              type="submit"
              disabled={emailState === 'submitting'}
              onClick={() => {}}
            >
              {emailState === 'submitting' ? <Spinner size="sm" variant="text" /> : t('profile.saveEmail')}
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className={s.section}>
          <p className={s.sectionTitle}>{t('profile.changePassword')}</p>
          <p className={s.note}>{t('profile.passwordChangedNote')}</p>
          {passwordState === 'error' && passwordError && (
            <Alert variant="error" dismissible onDismiss={() => setPasswordState('idle')}>
              {passwordError}
            </Alert>
          )}
          <form onSubmit={handlePasswordSubmit}>
            <InputField
              label={t('profile.newPassword')}
              name="password"
              type="password"
              placeholder={t('profile.newPasswordPlaceholder')}
              autocomplete="new-password"
            />
            <Button
              variant="surface"
              rounded="md"
              type="submit"
              disabled={passwordState === 'submitting'}
              onClick={() => {}}
            >
              {passwordState === 'submitting' ? <Spinner size="sm" variant="text" /> : t('profile.savePassword')}
            </Button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className={s.dangerSection}>
          <p className={s.dangerTitle}>{t('profile.dangerZone')}</p>
          {!showDeleteConfirm
            ? (
                <Button
                  variant="errorFilled"
                  rounded="md"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  {t('profile.deleteAccount')}
                </Button>
              )
            : (
                <>
                  <p className={s.confirmText}>{t('profile.deleteConfirm')}</p>
                  <div className={s.buttonRow}>
                    <Button
                      variant="surface"
                      rounded="md"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      {t('actions.cancel')}
                    </Button>
                    <Button
                      variant="errorFilled"
                      rounded="md"
                      disabled={deleting}
                      onClick={handleDeleteAccount}
                    >
                      {deleting ? <Spinner size="sm" variant="text" /> : t('profile.deleteConfirmButton')}
                    </Button>
                  </div>
                </>
              )}
        </div>
      </Modal.Body>
    </Modal>
  )
}
