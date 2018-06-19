import React from 'react';
import PropTypes from 'prop-types';

import MobileNavigationMenu from './mobile-navigation-menu';
import UserNavigation from './user-navigation';
import UserMenu from './user-menu';

function SignedInUserNavigation(props) {
  return (
    <div>
      <UserNavigation
        messagesLabel={props.messagesLabel}
        messagesLink={props.messagesLink}
        notificationsLabel={props.notificationsLabel}
        notificationsLink={props.notificationsLink}
      />
      <UserMenu user={props.user} userMenuNavList={props.userMenuNavList} />
      <MobileNavigationMenu adminNavLink={props.adminNavLink} isAdmin={props.isAdmin} mobileNavList={props.mobileNavList} />
    </div>
  );
}

SignedInUserNavigation.defaultProps = {
  isAdmin: false,
  user: {}
};

SignedInUserNavigation.propTypes = {
  isAdmin: PropTypes.bool,
  messagesLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  messagesLink: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  notificationsLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  notificationsLink: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  user: PropTypes.object.isRequired,
  userMenuNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired
};

export default SignedInUserNavigation;
