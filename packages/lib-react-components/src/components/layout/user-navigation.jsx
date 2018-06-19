import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';

import withMobileView from './with-mobile-view';

export function UserNavigation(props) {
  const messagesLabel = props.isMobile ?
    <i className="fa fa-bell-o fa-fw" aria-hidden="true" aria-label={props.messagesLabel} /> :
    props.messagesLabel;
  const notificationsLabel = props.isMobile ?
   <i className="fa fa-envelope-o fa-fw" aria-hidden="true" aria-label={props.notificationsLabel} /> :
   props.notificationsLabel

  return (
    <Menu className="user-navigation" align="center" direction="row" size="small" responsive={false} inline={true}>
      {React.cloneElement(props.notificationsLink, { label: notificationsLabel })}
      {React.cloneElement(props.messagesLink, { label: messagesLabel })}
    </Menu>
  );
}

UserNavigation.defaultProps = {
  isMobile: false,
  messagesLabel: "Messages",
  notificationsLabel: "Notifications",
  messagesLink: <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/inbox" />,
  notificationsLink: <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/notifications" />
};

UserNavigation.propTypes = {
  isMobile: PropTypes.bool,
  messagesLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  messagesLink: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  notificationsLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  notificationsLink: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired
};

export default withMobileView(UserNavigation);
