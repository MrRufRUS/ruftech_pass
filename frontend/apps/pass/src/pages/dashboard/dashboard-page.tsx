import type { IPasswordPublic, IPasswordDetail, IPasswordCreate, IPasswordUpdate } from '@ruftech/api'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { HttpError } from '@ruftech/http-client'
import { useHttpClient } from '@ruftech/http-client/react'
import { Heading } from '@ruftech/ui/heading'
import { Button } from '@ruftech/ui/button'
import { Alert } from '@ruftech/ui/alert'
import { DashboardHeader } from '@/components/dashboard-header'
import { listPasswords, createPassword, getPassword, updatePassword, deletePassword } from '@/shared/passwords'
import { PasswordList } from './password-list'
import { PasswordFormModal } from './password-form-modal'
import { PasswordDetailModal } from './password-detail-modal'
import { DeleteConfirmDialog } from './delete-confirm-dialog'
import * as s from './dashboard-page.css'

type PageView
  = | { view: 'list' }
    | { view: 'detail', id: number }
    | { view: 'create' }
    | { view: 'edit', id: number, initial: IPasswordDetail }
    | { view: 'delete-confirm', id: number, name: string }

export function DashboardPage() {
  const { t } = useTranslation('dashboard')
  const client = useHttpClient()

  const [pageView, setPageView] = useState<PageView>({ view: 'list' })
  const [passwords, setPasswords] = useState<IPasswordPublic[]>([])
  const [detail, setDetail] = useState<IPasswordDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const loadPasswords = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listPasswords(client)
      setPasswords(data)
    } catch {
      setError(t('errors.network'))
    } finally {
      setLoading(false)
    }
  }, [client, t])

  useEffect(() => {
    loadPasswords()
  }, [loadPasswords])

  async function handleSelect(id: number) {
    setPageView({ view: 'detail', id })
    setDetailLoading(true)
    try {
      const d = await getPassword(client, id)
      setDetail(d)
    } catch (err) {
      if (err instanceof HttpError && err.status === 404) {
        setPasswords((prev) => prev.filter((p) => p.id !== id))
        setPageView({ view: 'list' })
      } else {
        setError(t('errors.network'))
        setPageView({ view: 'list' })
      }
    } finally {
      setDetailLoading(false)
    }
  }

  async function handleCreate(data: IPasswordCreate | IPasswordUpdate) {
    await createPassword(client, data as IPasswordCreate)
    setPageView({ view: 'list' })
    await loadPasswords()
  }

  async function handleEdit(data: IPasswordCreate | IPasswordUpdate) {
    if (pageView.view !== 'edit') return
    await updatePassword(client, pageView.id, data as IPasswordUpdate)
    setPageView({ view: 'list' })
    await loadPasswords()
  }

  async function handleDelete() {
    if (pageView.view !== 'delete-confirm') return
    setDeleting(true)
    try {
      await deletePassword(client, pageView.id)
      setPageView({ view: 'list' })
      await loadPasswords()
    } catch (err) {
      if (err instanceof HttpError && err.status === 404) {
        setPasswords((prev) => prev.filter((p) => p.id !== pageView.id))
      } else {
        setError(t('errors.network'))
      }
      setPageView({ view: 'list' })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <DashboardHeader />
      <div className={s.page}>
        <div className={s.container}>
          <div className={s.pageHeader}>
            <Heading level={1}>{t('title')}</Heading>
            <Button variant="successFilled" rounded="md" onClick={() => setPageView({ view: 'create' })}>
              {t('addPassword')}
            </Button>
          </div>

          {error && (
            <Alert className={s.alert} variant="error" dismissible onDismiss={() => setError('')}>
              {error}
            </Alert>
          )}

          <PasswordList
            passwords={passwords}
            loading={loading}
            onSelect={handleSelect}
            onAdd={() => setPageView({ view: 'create' })}
          />

          <PasswordFormModal
            open={pageView.view === 'create'}
            mode="create"
            onSubmit={handleCreate}
            onClose={() => setPageView({ view: 'list' })}
          />

          <PasswordFormModal
            open={pageView.view === 'edit'}
            mode="edit"
            initial={pageView.view === 'edit' ? pageView.initial : null}
            onSubmit={handleEdit}
            onClose={() => setPageView({ view: 'list' })}
          />

          <PasswordDetailModal
            open={pageView.view === 'detail'}
            detail={detail}
            loading={detailLoading}
            onEdit={() => {
              if (detail) setPageView({ view: 'edit', id: detail.id, initial: detail })
            }}
            onDelete={() => {
              if (detail) setPageView({ view: 'delete-confirm', id: detail.id, name: detail.service_name })
            }}
            onClose={() => setPageView({ view: 'list' })}
          />

          <DeleteConfirmDialog
            open={pageView.view === 'delete-confirm'}
            serviceName={pageView.view === 'delete-confirm' ? pageView.name : ''}
            deleting={deleting}
            onConfirm={handleDelete}
            onCancel={() => setPageView({ view: 'list' })}
          />
        </div>
      </div>
    </>
  )
}
