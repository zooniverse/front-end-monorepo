'use client'

import { Trans, useTranslation } from '../../translations/i18n.js'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout'

function Collaborate() {
  const { t } = useTranslation()

  return (
    <GetInvolvedLayout>
      Collaborate Page
    </GetInvolvedLayout>
  )
}

export default Collaborate
