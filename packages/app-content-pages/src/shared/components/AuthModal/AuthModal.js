import { Modal, Tabs, Tab } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import withOnlyRenderOnBrowser from '@zooniverse/react-components/helpers/withOnlyRenderOnBrowser'
import { func, string } from 'prop-types'
import styled, { css } from 'styled-components'

import authModalTheme from './theme'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const StyledTabs = styled(Tabs)`
  div[role="tabpanel"] {
    ${css`background: ${props => props.theme.dark
    ? props.theme.global.colors['dark-5']
    : props.theme.global.colors['white']
};`}
    overflow: auto;
  }
  button[role="tab"][aria-selected="true"] > div {
    ${css`background: ${props => props.theme.dark
    ? props.theme.global.colors['dark-5']
    : props.theme.global.colors['white']
};`}
  }
`

function AuthModal (props) {
  const {
    activeIndex,
    className,
    closeModal,
    onActive
  } = props

  return (
    <Modal
      active={activeIndex > -1}
      className={className}
      closeFn={closeModal}
    >
      <StyledTabs activeIndex={activeIndex} onActive={onActive}>
        <Tab title='Sign In'>
          <LoginForm closeModal={closeModal} />
        </Tab>
        <Tab title='Register'>
          <RegisterForm closeModal={closeModal} />
        </Tab>
      </StyledTabs>
    </Modal>
  )
}

AuthModal.propTypes = {
  className: string,
  closeModal: func.isRequired
}

export default withOnlyRenderOnBrowser(withThemeContext(AuthModal, authModalTheme))