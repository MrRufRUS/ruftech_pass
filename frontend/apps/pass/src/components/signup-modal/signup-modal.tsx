import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@ruftech/ui/modal'
import { InputField } from '@ruftech/ui/input-field'
import { Button } from '@ruftech/ui/button'
import * as s from './signup-modal.css'

type SignupModalProps = {
  open: boolean
  onClose: () => void
}

export const SignupModal: FC<SignupModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation('home')

  return (
    <Modal open={open} onClose={onClose} title={t('signup.title')}>
      <Modal.Body>
        <form className={s.form} onSubmit={(e) => e.preventDefault()}>
          <InputField
            label={t('signup.email')}
            name="email"
            type="email"
            placeholder={t('signup.emailPlaceholder')}
            autocomplete="email"
          />
          <InputField
            label={t('signup.password')}
            name="password"
            type="password"
            placeholder={t('signup.passwordPlaceholder')}
            autocomplete="new-password"
          />
          <Button
            className={s.submit}
            variant="successFilled"
            rounded="md"
            onClick={onClose}
            type="submit"
          >
            {t('signup.submit')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
