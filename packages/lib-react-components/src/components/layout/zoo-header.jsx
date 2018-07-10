import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Header, Menu } from 'grommet';

import withMobileView from './with-mobile-view';
import ZooniverseLogo from '../zooniverse-logo';

export function ZooHeader(props) {
  return (
    <Header justify="between" className="zoo-header" direction="row" size="small">
      <Menu align="center" direction="row" size="small" responsive={false} inline={true}>
        {props.logoHomeLink &&
          props.logoHomeLink}
        {!props.isMobile &&
          <ul className="zoo-header__nav-list">
            {props.mainHeaderNavList.map((navItem, i) =>
              (<li
                key={`navItem-${i}`}
                className="zoo-header__nav-list-item zoo-header__nav-list-item--main"
              >
                {navItem}
              </li>))
            }
            {props.isAdmin &&
              <li className="zoo-header__nav-list-item zoo-header__nav-list-item--main">
                {props.adminNavLink}
              </li>}
          </ul>}
      </Menu>
      {props.authContainer &&
        props.authContainer}
    </Header>
  );
}

ZooHeader.defaultProps = {
  adminNavLink: <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/admin"  label="Admin" />,
  authContainer: null,
  isAdmin: false,
  logoHomeLink: <Anchor className="zoo-header__link" href="http://www.zooniverse.org"><ZooniverseLogo height="1.25em" width="1.25em" /></Anchor>,
  mainHeaderNavList: [
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/projects" label="Projects" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/about" label="About" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/get-involved" label="Get Involved" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/talk" label="Talk" />,
    <Anchor className="zoo-header__link--small" href="http://www.zooniverse.org/lab" label="Build A Project" />
  ]
};

ZooHeader.propTypes = {
  adminNavLink: PropTypes.node,
  authContainer: PropTypes.node,
  isAdmin: PropTypes.bool,
  logoHomeLink: PropTypes.node.isRequired,
  mainHeaderNavList: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default withMobileView(ZooHeader);
