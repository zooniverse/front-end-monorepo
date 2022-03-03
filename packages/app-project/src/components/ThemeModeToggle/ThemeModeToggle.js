import { PlainButton, withResponsiveContext } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { Info } from 'grommet-icons'
import { func, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledButton = styled(PlainButton)`
  white-space: nowrap;

  ${props => props.screenSize === 'small' ? css`
    > div {
      flex-direction: row;
      span {
        transform: none;
        writing-mode: unset;
      }
    }
  ` : css`
    > div {
      flex-direction: column-reverse;
      span {
        transform: rotate(180deg);
        writing-mode: vertical-lr;
      }
    }
  `}
`

const StyledInfo = styled(Info)`
  ${props => props.screenSize === 'small' ? css`
    transform: none;
    margin-top: 0;
  ` : css`
    transform: rotate(270deg);
    margin-top: 6px;
  `}
`

function ThemeModeToggle (props) {
  const { t } = useTranslation('components')
  const { onClick, screenSize, theme: { dark } } = props
  const text = dark
    ? t('ThemeModeToggle.switchToLight')
    : t('ThemeModeToggle.switchToDark')

  return (
    <Box justify='center'>
      <StyledButton
        a11yTitle={text}
        icon={<StyledInfo color='dark-5' screensize={screenSize} size='15px' />}
        text={text}
        onClick={onClick}
        screenSize={screenSize}
      />
    </Box>
  )
}

ThemeModeToggle.propTypes = {
  mode: string,
  onClick: func
}

export default withTheme(withResponsiveContext(ThemeModeToggle))
