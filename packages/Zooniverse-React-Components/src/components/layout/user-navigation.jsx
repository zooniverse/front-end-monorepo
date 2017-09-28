import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';

const UserNavigation = (props) => {
  const createKeyedAnchorItem = (navItem, i) => {
    return (React.cloneElement(navItem, { key: `navItem-${i}` }));
  };

  return (
    <Menu className="user-navigation" align="center" direction="row" size="small" responsive={false} inline={true}>
      {props.userNavigationNavList.map((navItem, i) => {
        return createKeyedAnchorItem(navItem, i);
      })}
    </Menu>
  );
}

UserNavigation.defaultProps = {
  userNavigationNavList: [
    <Anchor className="site-header__link--small" href="http://www.zooniverse.org/notifications" label="Notifications" />,
    <Anchor className="site-header__link--small" href="http://www.zooniverse.org/inbox" label="Messages" />
  ]
};

UserNavigation.propTypes = {
  userNavigationNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired
};

export default UserNavigation;
