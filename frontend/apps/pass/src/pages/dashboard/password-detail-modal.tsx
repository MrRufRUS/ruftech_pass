import type { IPasswordDetail } from '@ruftech/api'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@ruftech/ui/modal'
import { Button } from '@ruftech/ui/button'
import { Spinner } from '@ruftech/ui/spinner'
import * as s from './password-detail-modal.css'

type Props = {
  open: boolean
  detail: IPasswordDetail | null
  loading: boolean
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export const PasswordDetailModal: FC<Props> = ({
  open,
  detail,
  loading,
  onEdit,
  onDelete,
  onClose,
}) => {
  const { t } = useTranslation('dashboard')
  const [showPassword, setShowPassword] = useState(false)

  const handleClose = () => {
    setShowPassword(false)
    onClose()
  }

  if (!open) return null

  return (
    <Modal open={open} onClose={handleClose} title={t('detail.title')}>
      <Modal.Body>
        {loading || !detail
          ? (
              <div className={s.center}>
                <Spinner size="md" />
              </div>
            )
          : (
              <>
                <div className={s.fieldRow}>
                  <span className={s.fieldLabel}>{t('fields.serviceName')}</span>
                  <span className={s.fieldValue}>{detail.service_name}</span>
                </div>
                {detail.service_url && (
                  <div className={s.fieldRow}>
                    <span className={s.fieldLabel}>{t('fields.serviceUrl')}</span>
                    <span className={s.fieldValue}>{detail.service_url}</span>
                  </div>
                )}
                <div className={s.fieldRow}>
                  <span className={s.fieldLabel}>{t('fields.login')}</span>
                  <span className={s.fieldValue}>{detail.login}</span>
                </div>
                <div className={s.fieldRow}>
                  <span className={s.fieldLabel}>{t('fields.password')}</span>
                  <span className={s.fieldValue}>
                    {showPassword ? detail.password : '••••••••'}
                    <button
                      type="button"
                      className={s.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? t('actions.hidePassword') : t('actions.showPassword')}
                    </button>
                  </span>
                </div>
              </>
            )}
      </Modal.Body>
      {detail && !loading && (
        <Modal.Footer>
          <Button variant="surface" rounded="md" onClick={onEdit}>
            {t('actions.edit')}
          </Button>
          <Button variant="errorFilled" rounded="md" onClick={onDelete}>
            {t('actions.delete')}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}
