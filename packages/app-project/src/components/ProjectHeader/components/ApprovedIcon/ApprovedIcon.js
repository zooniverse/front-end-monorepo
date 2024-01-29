import { Box } from 'grommet'
import { FormCheckmark } from 'grommet-icons'
import { observer, MobXProviderContext} from 'mobx-react'
import { useContext } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledBox = styled(Box)`
  border-radius: 100%;
  flex-shrink: 0;
`

const StyledCheckmark = styled(FormCheckmark)`
  width: 1.5rem;
  height: 1.5rem;

  @media (width < 48rem) {
    width: 1.25rem;
    height: 1.25rem;
  }
`

function useProjectLaunchApproved() {
  const { store } = useContext(MobXProviderContext)
  return store.project.launch_approved
}

function ApprovedIcon () {
  const approved = useProjectLaunchApproved()
  const { t } = useTranslation('components')
  if (approved) {
    return (
      <StyledBox background='white'>
        <StyledCheckmark
          aria-label={t('ProjectHeader.ApprovedIcon.title')}
          color='brand'
        />
      </StyledBox>
    )
  }

  return null
}

export default observer(ApprovedIcon)
