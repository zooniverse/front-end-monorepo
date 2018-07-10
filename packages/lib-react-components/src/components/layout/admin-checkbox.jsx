import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'grommet';

const AdminCheckbox = (props) => {
  return (
    <CheckBox
      checked={props.checked}
      id="admin-checkbox"
      name="admin-checkbox"
      label={props.label}
      onChange={props.onChange}
      toggle={true}
    />
  );
};

AdminCheckbox.defaultProps = {
  checked: false,
  label: 'Admin Mode',
  onChange: () => {}
};

AdminCheckbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

export default AdminCheckbox;