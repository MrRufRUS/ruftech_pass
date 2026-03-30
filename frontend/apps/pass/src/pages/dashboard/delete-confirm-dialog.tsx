import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@ruftech/ui/modal'
import { Button } from '@ruftech/ui/button'
import { Spinner } from '@ruftech/ui/spinner'

type Props = {
  open: boolean
  serviceName: string
  deleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmDialog: FC<Props> = ({
  open,
  serviceName,
  deleting,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation('dashboard')

  return (
    <Modal open={open} onClose={onCancel} title={t('delete.title')}>
      <Modal.Body>
        <p>{t('delete.confirm', { name: serviceName })}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="surface" rounded="md" onClick={onCancel} disabled={deleting}>
          {t('actions.cancel')}
        </Button>
        <Button variant="errorFilled" rounded="md" onClick={onConfirm} disabled={deleting}>
          {deleting ? <Spinner size="sm" variant="text" /> : t('actions.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
