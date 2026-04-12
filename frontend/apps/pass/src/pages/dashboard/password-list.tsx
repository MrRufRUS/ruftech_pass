import type { IPasswordPublic } from '@ruftech/api'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ruftech/ui/button'
import { Spinner } from '@ruftech/ui/spinner'
import * as s from './password-list.css'

type Props = {
  passwords: IPasswordPublic[]
  loading: boolean
  onSelect: (id: number) => void
  onAdd: () => void
}

export const PasswordList: FC<Props> = ({ passwords, loading, onSelect, onAdd }) => {
  const { t } = useTranslation('dashboard')

  if (loading) {
    return (
      <div className={s.center}>
        <Spinner size="md" />
      </div>
    )
  }

  if (passwords.length === 0) {
    return (
      <div className={s.empty}>
        <span className={s.emptyIcon}>🔒</span>
        <p>{t('empty.title')}</p>
        <p>{t('empty.description')}</p>
        <Button variant="successFilled" rounded="md" onClick={onAdd}>
          {t('addPassword')}
        </Button>
      </div>
    )
  }

  return (
    <div className={s.list}>
      {passwords.map((pw) => (
        <button key={pw.id} type="button" className={s.item} onClick={() => onSelect(pw.id)}>
          <span className={s.avatar}>{pw.service_name.charAt(0)}</span>
          <span className={s.itemContent}>
            <span className={s.itemName}>{pw.service_name}</span>
          </span>
          <span className={s.itemArrow}>→</span>
        </button>
      ))}
    </div>
  )
}
