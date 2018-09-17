import React from 'react';
import PropTypes from 'prop-types';

export default class FileButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetting: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if (this.state.resetting) {
      this.setState({ resetting: false }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  handleChange(...args) {
    this.props.onSelect(args);
    this.setState({ resetting: true });
  }

  render() {
    let input;
    if (this.state.resetting) {
      input = null;
    } else {
      const { accept, multiple, disabled } = this.props;
      const passedProps = { accept, multiple, disabled };
      input = <input type="file" {...passedProps} style={this.props.inputStyle} onChange={this.handleChange} />;
    }

    const styles = Object.assign({}, this.props.rootStyle, this.props.style);

    const props = {
      'data-accept': this.props.accept,
      'data-disabled': this.props.disabled || null,
      'data-multiple': this.props.multiple || null,
      className: `file-button ${this.props.className}`.trim(),
      style: styles,
    };

    return (
      React.createElement(this.props.tag,
        props,
        <span style={this.props.containerStyle}>{input}</span>,
        this.props.children
      )
    );
  }
}

FileButton.defaultProps = {
  accept: '*/*',
  children: null,
  className: '',
  containerStyle: {
    height: '100%',
    left: 0,
    opacity: 0.01,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  disabled: false,
  inputStyle: {
    cursor: 'pointer',
    height: '300%',
    left: '-100%',
    opacity: 0.01,
    position: 'absolute',
    top: '-100%',
    width: '300%',
  },
  multiple: false,
  onSelect: () => {},
  rootStyle: { position: 'relative' },
  style: {},
  tag: 'label',
};

FileButton.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  containerStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
  rootStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
};

