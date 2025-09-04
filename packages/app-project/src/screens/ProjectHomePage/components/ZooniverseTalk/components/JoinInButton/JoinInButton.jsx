import { Button } from 'grommet'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import addQueryParams from '@helpers/addQueryParams'

const StyledButton = styled(Button)`
  text-align: center;
`

function JoinInButton () {
  const { t } = useTranslation('screens')
  const router = useRouter()
  const { owner, project } = router?.query
  const label = t('Home.ZooniverseTalk.button')

  // Talk is a PFE page
  const href = addQueryParams(`https://www.zooniverse.org/projects/${owner}/${project}/talk`)


  return (
    <StyledButton href={href} label={label} />
  )
}

export default JoinInButton
