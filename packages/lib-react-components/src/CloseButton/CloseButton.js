import { bool, func, object, oneOfType, string } from 'prop-types'
import styled from 'styled-components'
import { Button } from 'grommet'
import CloseIcon from './components/CloseIcon'
import { useTranslation } from '../translations/i18n'

const StyledButton = styled(Button)`
  height: 1rem;
  padding: 0;
  width: 1rem;

  svg {
    opacity: 0.7;
  }

  &:active svg,
  &:hover svg, &:focus svg {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const DEFAULT_HANDLER = () => {}

function CloseButton ({ closeFn = DEFAULT_HANDLER, color = '', disabled = false, href = '', ...rest }) {
  // We've destructured href from the props to make sure it's NOT passed along

  const { t } = useTranslation()

  return (
    <StyledButton
      a11yTitle={t('CloseButton.close')}
      disabled={disabled}
      icon={<CloseIcon color={color} size='15px' />}
      onClick={closeFn}
      {...rest}
    />
  )
}

CloseButton.propTypes = {
  className: string,
  closeFn: func.isRequired,
  color: oneOfType([string, object]),
  disabled: bool
}

export default CloseButton
