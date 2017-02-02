import React from 'react';

const MAX_THUMBNAIL_DIMENSION = 999;

export default class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
    };

    this.handleError = this.handleError.bind(this);
  }

  getThumbnailSrc({ origin, width, height, src }) { // eslint-disable-line class-methods-use-this
    const srcPath = src.split('//').pop();
    return (`${origin}/${width}x${height}/${srcPath}`);
  }

  handleError() {
    if (!this.state.failed) {
      this.setState({ failed: true });
    }
  }

  render() {
    const src = this.state.failed ? this.props.src : this.getThumbnailSrc(this.props);

    const dimensions = {
      width: null,
      height: null,
    };

    const style = {
      maxWidth: this.props.width,
      maxHeight: this.props.height,
    };

    if (this.props.format === 'mp4') {
      return (
        <div>
          <video width="300" controls>
            <source src={this.props.src} type="video/mp4" />
          </video>
        </div>
      );
    }

    return (
      <img alt="" {...this.props} src={src} {...dimensions} style={style} onError={this.handleError} />
    );
  }
}

Thumbnail.defaultProps = {
  format: 'image',
  height: MAX_THUMBNAIL_DIMENSION,
  origin: 'https://thumbnails.zooniverse.org',
  src: '',
  width: MAX_THUMBNAIL_DIMENSION,
};

Thumbnail.propTypes = {
  format: React.PropTypes.string,
  height: React.PropTypes.number,
  origin: React.PropTypes.string, // eslint-disable-line react/forbid-prop-types, react/no-unused-prop-types
  src: React.PropTypes.string,
  width: React.PropTypes.number,
};
