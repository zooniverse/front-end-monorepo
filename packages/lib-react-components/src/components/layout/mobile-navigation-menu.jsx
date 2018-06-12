import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import MenuIcon from 'grommet/components/icons/base/Menu';

import withMobileView from './with-mobile-view';

export function MobileNavigationMenu(props) {
  function createKeyedAnchorItem(navItem, i) {
    return (React.cloneElement(navItem, { key: `navItem-${i}` }));
  };

  // TO DO: look into why the Grommet Menu component does not use the props defined for pad
  // Even if defined it still uses its default prop of none
  if (props.isMobile) {
    return (
      <Menu
        className="mobile-navigation-menu"
        icon={<MenuIcon size="xsmall" />}
        dropAlign={{ right: 'right', top: 'top' }}
      >
        {props.mobileNavList.map((navItem, i) => {
          return createKeyedAnchorItem(navItem, i);
        })}
        {props.isAdmin &&
          props.adminNavLink}
      </Menu>
    )
  }


  return null;
}

MobileNavigationMenu.defaultProps = {
  adminNavLink: <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/admin"  label="Admin" />,
  isAdmin: false,
  isMobile: false,
  mobileNavList: [
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/" label="Zooniverse" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/projects" label="Projects" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/about" label="About" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/get-involved" label="Get Involved" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/talk" label="Talk" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/lab" label="Build A Project" />
  ]
};

MobileNavigationMenu.propTypes = {
  adminNavLink: PropTypes.node,
  isAdmin: PropTypes.bool,
  isMobile: PropTypes.bool,
  mobileNavList: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default withMobileView(MobileNavigationMenu);
