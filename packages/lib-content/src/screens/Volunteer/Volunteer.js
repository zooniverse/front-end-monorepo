'use client'

import { Trans, useTranslation } from '../../translations/i18n.js'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout'

function Volunteer() {
  const { t } = useTranslation()

  return (
    <GetInvolvedLayout>
      Volunteer Page
    </GetInvolvedLayout>
  )
}

export default Volunteer
