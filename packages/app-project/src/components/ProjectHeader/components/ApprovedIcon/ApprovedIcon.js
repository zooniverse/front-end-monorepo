import { Box } from 'grommet'
import { FormCheckmark } from 'grommet-icons'
import { observer, MobXProviderContext} from 'mobx-react'
import { useContext } from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledBox = styled(Box)`
  border-radius: 100%;
  flex-shrink: 0;
`

function useProjectLaunchApproved() {
  const { store } = useContext(MobXProviderContext)
  return store.project.launch_approved
}

function ApprovedIcon ({
  size = 'medium'
}) {
  const approved = useProjectLaunchApproved()
  const { t } = useTranslation('components')
  if (approved) {
    return (
      <StyledBox background='white'>
        <FormCheckmark
          aria-label={t('ProjectHeader.ApprovedIcon.title')}
          color='brand'
          size={size}
        />
      </StyledBox>
    )
  }

  return null
}

ApprovedIcon.propTypes = {
  /** Icon size. Either a Grommet theme t-shirt size or a valid CSS length. */
  size: string
}

export default observer(ApprovedIcon)
