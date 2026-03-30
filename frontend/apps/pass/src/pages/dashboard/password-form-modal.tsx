import type { IPasswordCreate, IPasswordDetail, IPasswordUpdate } from '@ruftech/api'
import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PasswordCreate, PasswordUpdate } from '@ruftech/api'
import { Modal } from '@ruftech/ui/modal'
import { InputField } from '@ruftech/ui/input-field'
import { Button } from '@ruftech/ui/button'
import { Alert } from '@ruftech/ui/alert'
import { Spinner } from '@ruftech/ui/spinner'
import * as s from './password-form-modal.css'

type Props = {
  open: boolean
  mode: 'create' | 'edit'
  initial?: IPasswordDetail | null
  onSubmit: (data: IPasswordCreate | IPasswordUpdate) => Promise<void>
  onClose: () => void
}

type FormState = 'idle' | 'submitting' | 'error'

type FieldErrors = {
  service_name?: boolean
  service_url?: boolean
  login?: boolean
  password?: boolean
}

export const PasswordFormModal: FC<Props> = ({ open, mode, initial, onSubmit, onClose }) => {
  const { t } = useTranslation('dashboard')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const title = mode === 'create' ? t('create.title') : t('edit.title')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const raw = {
      service_name: (formData.get('service_name') as string).trim(),
      service_url: (formData.get('service_url') as string).trim() || null,
      login: (formData.get('login') as string).trim(),
      password: (formData.get('password') as string),
    }

    const schema = mode === 'create' ? PasswordCreate : PasswordUpdate
    const result = schema.safeParse(raw)

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
      await onSubmit(result.data)
    } catch (err) {
      setFormState('error')
      setErrorMessage(err instanceof Error ? err.message : t('errors.network'))
    }
  }

  function handleClose() {
    setFormState('idle')
    setErrorMessage('')
    setFieldErrors({})
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <Modal.Body>
        {formState === 'error' && errorMessage && (
          <Alert variant="error" dismissible onDismiss={() => setFormState('idle')}>
            {errorMessage}
          </Alert>
        )}
        <form key={`${mode}-${initial?.id ?? 'new'}`} id="password-form" className={s.form} onSubmit={handleSubmit}>
          <InputField
            label={t('fields.serviceName')}
            name="service_name"
            type="text"
            placeholder={t('placeholders.serviceName')}
            defaultValue={initial?.service_name ?? ''}
            error={fieldErrors.service_name}
          />
          <InputField
            label={t('fields.serviceUrl')}
            name="service_url"
            type="url"
            placeholder={t('placeholders.serviceUrl')}
            defaultValue={initial?.service_url ?? ''}
            error={fieldErrors.service_url}
          />
          <InputField
            label={t('fields.login')}
            name="login"
            type="text"
            placeholder={t('placeholders.login')}
            defaultValue={initial?.login ?? ''}
            error={fieldErrors.login}
          />
          <InputField
            label={t('fields.password')}
            name="password"
            type="password"
            placeholder={t('placeholders.password')}
            defaultValue={mode === 'edit' ? '' : ''}
            error={fieldErrors.password}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className={s.footer}>
          <Button variant="surface" rounded="md" onClick={handleClose}>
            {t('actions.cancel')}
          </Button>
          <Button
            variant="successFilled"
            rounded="md"
            type="submit"
            form="password-form"
            disabled={formState === 'submitting'}
            onClick={() => { /* form submit via form attribute */ }}
          >
            {formState === 'submitting'
              ? <Spinner size="sm" variant="text" />
              : t('actions.save')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
