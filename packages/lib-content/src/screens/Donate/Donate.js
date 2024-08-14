'use client'

import { Trans, useTranslation } from '../../translations/i18n.js'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout'

function Donate() {
  const { t } = useTranslation()

  return (
    <GetInvolvedLayout>
      Donate Page
    </GetInvolvedLayout>
  )
}

export default Donate
