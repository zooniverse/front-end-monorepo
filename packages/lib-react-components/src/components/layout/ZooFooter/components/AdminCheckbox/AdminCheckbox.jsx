import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox, Grommet } from 'grommet';
import zooTheme from '@zooniverse/grommet-theme';

const AdminCheckbox = (props) => {
  return (
    <Grommet theme={zooTheme}>
      <CheckBox
        checked={props.checked}
        id="admin-checkbox"
        name="admin-checkbox"
        label={props.label}
        onChange={props.onChange}
        toggle={true}
      />
    </Grommet>
  );
};

AdminCheckbox.defaultProps = {
  checked: false,
  colorTheme: 'light',
  label: 'Admin Mode',
  onChange: () => {}
};

AdminCheckbox.propTypes = {
  checked: PropTypes.bool,
  colorTheme: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
};

export default AdminCheckbox;