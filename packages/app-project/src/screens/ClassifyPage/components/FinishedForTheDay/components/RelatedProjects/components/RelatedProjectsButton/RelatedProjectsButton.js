import { Button, Text } from 'grommet'
import { func } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledButton = styled(Button)`
  border-width: 1px;
  flex: 1 1 300px;
  margin: 0 10px 10px 0;
  max-width: 300px;
`

function RelatedProjectsButton (props) {
  const { t } = useTranslation('screens')
  const { onClick } = props
  const buttonText = t('Classify.FinishedForTheDay.RelatedProjectsButton.label')
  return (
    <StyledButton
      a11yTitle={buttonText}
      onClick={onClick}
      label={(
        <Text size='small'>
          {buttonText}
        </Text>
      )}
    />
  )
}

RelatedProjectsButton.propTypes = {
  onClick: func.isRequired
}

export default RelatedProjectsButton
