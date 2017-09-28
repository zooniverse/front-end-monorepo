import React from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';

const LogoutButton = ({ className, label, logout }) => {
  return (
    <Button className={className} type="button" onClick={logout} label={label} plain={true} />
  );
};

LogoutButton.defaultProps = {
  className: 'site-header__button--as-link',
  label: 'Logout',
  logout: () => {}
};

LogoutButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  logout: PropTypes.func.isRequired
};

export default LogoutButton;
