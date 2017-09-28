import React from 'react';
import PropTypes from 'prop-types';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import ZooniverseLogo from '../zooniverse-logo';

const ZooHeader = (props) => {
  return (
    <Header justify="between" className="zoo-header" direction="row" size="small" responsive={true}>
      <Menu align="center" direction="row" size="small" responsive={false} inline={true}>
        {props.logoHomeLink &&
          props.logoHomeLink}
        <ul className="site-header__nav-list">
          {props.mainHeaderNavList.map((navItem, i) =>
            <li key={`navItem-${i}`} className="site-header__nav-list-item" style={{ display: 'inline-block' }}>{navItem}</li>)}
        </ul>
      </Menu>
      {props.authContainer &&
        props.authContainer}
    </Header>
  );
};

ZooHeader.defaultProps = {
  authContainer: null,
  logoHomeLink: <Anchor className="site-header__link" href="http://www.zooniverse.org"><ZooniverseLogo height="1.25em" width="1.25em" /></Anchor>,
  mainHeaderNavList: [
    <Anchor className="site-header__link--small" href="http://www.zooniverse.org/projects" label="Projects" />,
    <Anchor className="site-header__link--small" href="http://www.zooniverse.org/about" label="About" />,
    <Anchor className="site-header__link--small" href="http://www.zooniverse.org/get-involved" label="Get Involved" />,
    <Anchor className="site-header__link--small" href="http://www.zooniverse.org/talk" label="Talk" />,
    <Anchor className="site-header__link--small" href="http://www.zooniverse.org/lab" label="Build A Project" />
  ]
};

ZooHeader.propTypes = {
  authContainer: PropTypes.node,
  logoHomeLink: PropTypes.node.isRequired,
  mainHeaderNavList: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default ZooHeader;
