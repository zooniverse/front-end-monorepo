import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'grommet';

export default function UserMenu(props) {
  const createKeyedAnchorItem = (navItem, i) => {
    return (React.cloneElement(navItem, { key: `navItem-${i}` }));
  };

  return (
    <Menu className="zoo-header-menu" label={props.user.display_name} dropAlign={{ right: 'right', top: 'top' }}>
      {props.userMenuNavList.map((navItem, i) => {
        return createKeyedAnchorItem(navItem, i);
      })}
    </Menu>
  );
};

UserMenu.defaultProps = {
  user: { display_name: '' }
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    display_name: PropTypes.string
  }).isRequired,
  userMenuNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired
};
