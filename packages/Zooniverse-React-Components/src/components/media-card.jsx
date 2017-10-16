import React from 'react';
import PropTypes from 'prop-types';

const IMAGE_EXTENSIONS = ['gif', 'jpeg', 'jpg', 'png', 'svg'];

const VIDEO_EXTENSIONS = ['mp4'];

export default class MediaCard extends React.Component {
  render() {
    const srcExtension = this.props.src.split('.').pop().toLowerCase();
    let mediaRender;
    if (IMAGE_EXTENSIONS.indexOf(srcExtension) >= 0) {
      mediaRender = <img className="media-card-media" src={this.props.src} />;
    } else if (VIDEO_EXTENSIONS.indexOf(srcExtension) >= 0) {
      mediaRender = (
        <video className="media-card-media" src={this.props.src}>
          <p>Your browser does not support this video format.</p>
        </video>
      )
    } else {
      console.warn(`Not sure how to render ${this.props.src}`);
      return null;
    }

    return (
      <div {...this.props} className={`media-card ${this.props.className}`.trim()}>
        {this.props.src && (
          <div className="media-card-header">
            {mediaRender}
          </div>
        )}

        {this.props.children && (
          <div className="media-card-content">{this.props.children}</div>
        )}
      </div>
    )
  }
}

MediaCard.propTypes = {
  src: PropTypes.string
}

MediaCard.defaultProps = {
  src: ''
};
