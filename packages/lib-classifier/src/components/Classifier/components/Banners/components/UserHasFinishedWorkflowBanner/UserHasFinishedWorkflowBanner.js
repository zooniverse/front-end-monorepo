import { bool, shape, string } from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Banner from '../Banner'

export default function UserHasFinishedWorkflowBanner({ subject }) {
  const { t } = useTranslation('components')

  const show = !!subject &&
    !subject.finished_workflow &&
    subject.user_has_finished_workflow

  return (
    <Banner
      background='status-warning'
      bannerText={t('Banners.UserHasFinishedWorkflowBanner.bannerText')}
      show={show}
      tooltipText={t('Banners.UserHasFinishedWorkflowBanner.tooltipText', { returnObjects: true })}
    />
  )
}

UserHasFinishedWorkflowBanner.propTypes = {
  /** The current subject. */
  subject: shape({
    finished_workflow: bool,
    id: string,
    retired: bool
  })
}
