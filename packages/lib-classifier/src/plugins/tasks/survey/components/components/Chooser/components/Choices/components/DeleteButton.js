import { Box, Button } from 'grommet'
import { FormClose } from 'grommet-icons'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const StyledButton = styled(Button)`
  height: 100%;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    border: 2px solid ${props => props.theme.global.colors['accent-1']};
    box-shadow: none;
  }

  &:focus, &:hover {
    svg {
      border: 2px solid ${props => props.theme.global.colors['neutral-6']};
      border-radius: 50%;
    }
  }
`

const IconWrapper = styled(Box)`
  background: ${props => props.theme.global.colors.brand};
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 2;
`

const ChildrenWrapper = styled(Box)`
  position: relative;

  & > img {
    filter: blur(0.5px);
  }

  &::before {
    content: '';
    background: rgba(0, 93, 105, 0.6); // using neutral-1 #005D69 at 60%
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
`

function DeleteButton ({
  children,
  choiceLabel = '',
  deleteFn,
  disabled = false,
  tabIndex = -1
}) {
  const { t } = useTranslation('plugins')

  return (
    <StyledButton
      a11yTitle={t('SurveyTask.DeleteButton.delete', { choiceLabel })}
      disabled={disabled}
      onClick={deleteFn}
      tabIndex={tabIndex}
    >
      <ChildrenWrapper>
        {children}
        <IconWrapper>
          <FormClose color='neutral-6'/>
        </IconWrapper>
      </ChildrenWrapper>
    </StyledButton>
  )
}

DeleteButton.propTypes = {
  choiceLabel: string,
  deleteFn: func.isRequired,
  disabled: bool,
  tabIndex: number
}

export default DeleteButton
