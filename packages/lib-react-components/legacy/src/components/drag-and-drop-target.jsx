import React from 'react';
import PropTypes from 'prop-types';

export default class DragAndDropTarget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canDrop: false,
    };

    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragEnter(e, ...args) {
    e.preventDefault();
    this.setState({ canDrop: true });
    this.props.onDragEnter(args);
  }

  handleDragOver(e, ...args) {
    e.preventDefault();
    this.props.onDragOver(args);
  }

  handleDragLeave(e, ...args) {
    e.preventDefault();
    this.props.onDragLeave(args);
  }

  handleDrop(e, ...args) {
    e.preventDefault();
    this.setState({ canDrop: false });
    this.props.onDrop(args);
  }

  render() {
    const className = `file-drop-target ${this.props.className}`.trim();
    return (
      <div
        {...this.props}
        className={className}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        data-can-drop={this.state.canDrop || null}
      >
        {this.props.children}
      </div>
    );
  }
}

DragAndDropTarget.defaultProps = {
  children: null,
  className: '',
  onDragEnter: () => {},
  onDragOver: () => {},
  onDragLeave: () => {},
  onDrop: () => {},
};

DragAndDropTarget.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
};
