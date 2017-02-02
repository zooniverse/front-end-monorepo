import React from 'react';
import TriggeredModalForm from 'modal-form/triggered';
import Thumbnail from './thumbnail';

export default class MediaIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.setState({ deleting: true });
    this.props.resource.delete().then(() => {
      this.setState({ deleting: false });
      this.props.onDelete(this.props.resource);
    });
  }

  /* eslint-disable max-len */
  render() {
    const mediaIconStyle = this.state.deleting ? { opacity: 0.5 } : null;

    return (
      <div className="media-icon" style={mediaIconStyle}>
        <div className="media-icon-thumbnail-container">
          <TriggeredModalForm
            trigger={
              <Thumbnail className="media-icon-thumbnail" src={this.props.resource.src} height={this.props.height} style={{ position: 'relative' }} />
            }
          >
            <div className="content-container">
              <img alt="" src={this.props.resource.src} style={{ maxHeight: '80vh', maxWidth: '60vw' }} />
            </div>
          </TriggeredModalForm>
          <button type="button" className="media-icon-delete-button" disabled={this.state.deleting} onClick={this.handleDelete}>&times;</button>
        </div>
        {this.props.resource.metadata &&
          <div>
            <span className="media-icon-label" style={{ position: 'relative' }}>{this.props.resource.metadata.filename}</span>
            <textarea
              className="media-icon-markdown"
              value={`![${this.props.resource.metadata.filename}(${this.props.resource.src})`}
              readOnly={true}
              style={{ position: 'relative' }}
              onFocus={e => e.target.setSelectionRange(0, e.target.value.length)}
            />
          </div>}
      </div>
    );
  }
  /* eslint-enable */
}

MediaIcon.defaultProps = {
  height: 80,
  onDelete: () => {},
  resource: {},
};

MediaIcon.propTypes = {
  height: React.PropTypes.number,
  onDelete: React.PropTypes.func,
  resource: React.PropTypes.shape({
    delete: React.PropTypes.func,
    id: React.PropTypes.string,
    metadata: React.PropTypes.object,
    src: React.PropTypes.string,
  }).isRequired,
};
