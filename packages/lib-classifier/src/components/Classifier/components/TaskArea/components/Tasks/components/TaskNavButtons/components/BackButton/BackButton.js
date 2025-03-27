import { bool, func, object} from 'prop-types'
import { Button, Text } from 'grommet'
import styled from 'styled-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import theme from './theme'
import { useTranslation } from '@translations/i18n'

export const StyledBackButtonWrapper = styled.div`
  margin-right: 1ch;
  flex: 0 0 33%;
`

function BackButton({
  canUndo = false,
  onClick = () => true
}) {
  const { t } = useTranslation('components')
  if (canUndo) {
    return (
      <StyledBackButtonWrapper>
        <Button
          focusIndicator={false}
          label={
            <Text size='small'>{t('TaskArea.Tasks.BackButton.back')}</Text>
          }
          onClick={onClick}
        />
      </StyledBackButtonWrapper>
    )
  }
  return null
}

BackButton.propTypes = {
  canUndo: bool,
  onClick: func,
  theme: object
}

export default withThemeContext(BackButton, theme)
export { BackButton }
