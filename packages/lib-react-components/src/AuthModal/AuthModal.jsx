import { func, number, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'

import Modal from '../Modal'
import Tabs from '../Tabs'
import Tab from '../Tab'
import withThemeContext from '../helpers/withThemeContext'
import { useTranslation } from '../translations/i18n'
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

/**
  A modal dialog that provides a choice to either sign-in to your Zooniverse account, or create a new account.
  Password reset is handled by a link to the reset page. Sign-in is handled by the [Panoptes JS
  Client](https://zooniverse.github.io/panoptes-javascript-client/#panoptes-javascript-client-auth), using the
  [OAuth password flow](https://oauth.net/2/grant-types/password/).
*/
function AuthModal({
  activeIndex = -1,
  className = '',
  closeModal,
  project,
  onActive,
  onSignIn
}) {
  const { t } = useTranslation()
  return (
    <Modal
      active={activeIndex > -1}
      aria-label={t("AuthModal.title")}
      aria-modal='true'
      className={className}
      closeFn={closeModal}
      role='dialog'
      pad='0'
      height={{ max: '90%' }} // To account for Safari mobile browser. Don't use vh units.
    >
      <StyledTabs activeIndex={activeIndex} onActive={onActive}>
        <Tab title={t("AuthModal.LoginForm.signIn")}>
          <LoginForm closeModal={closeModal} onSignIn={onSignIn} />
        </Tab>
        <Tab title={t("AuthModal.RegisterForm.register")}>
          <RegisterForm closeModal={closeModal} project={project} onSignIn={onSignIn} />
        </Tab>
      </StyledTabs>
    </Modal>
  )
}

AuthModal.propTypes = {
  /** Active tab index: -1 (no selection), 0 (sign in), or 1 (register.) */
  activeIndex: number,
  /** Optional CSS class(es.) */
  className: string,
  /** Callback function to reset the active tab index */
  closeModal: func.isRequired,
  /** Optional Zooniverse project. */
  project: shape({
    id: string
  }),
  /** Callback to switch the active tab. */
  onActive: func,
  /** Callback to handle user state in parent app (such as a mobx store) */
  onSignIn: func
}

export default withThemeContext(AuthModal, authModalTheme)
