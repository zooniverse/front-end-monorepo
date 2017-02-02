import React from 'react';

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
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onDragEnter: React.PropTypes.func,
  onDragOver: React.PropTypes.func,
  onDragLeave: React.PropTypes.func,
  onDrop: React.PropTypes.func,
};
