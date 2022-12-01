import { bool, shape, string } from 'prop-types'
import React from 'react'
import { useTranslation } from '@translations/i18n'
import Banner from '../Banner'

export default function  WorkflowIsFinishedBanner({ subject }) {
  const { t } = useTranslation('components')

  const show = !!subject &&
    subject.id &&
    subject.finished_workflow

  return (
    <Banner
      background='status-critical'
      bannerText={t('Banners.WorkflowIsFinishedBanner.bannerText')}
      show={show}
      tooltipText={t('Banners.WorkflowIsFinishedBanner.tooltipText', { returnObjects: true })}
    />
  )
}

WorkflowIsFinishedBanner.propTypes = {
  /** The current subject */
  subject: shape({
    finished_workflow: bool,
    id: string,
    retired: bool
  })
}
