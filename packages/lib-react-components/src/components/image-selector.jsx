import React from 'react';
import PropTypes from 'prop-types';
// TODO: [window is undefined](https://github.com/zeit/next.js/wiki/FAQ) issue with data-uri-to-blob, commenting out, needs proper fix
// import toBlob from 'data-uri-to-blob';
import FileButton from './file-button';
import Thumbnail from './thumbnail';

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      working: false
    };

    this.cropImage = this.cropImage.bind(this);
    this.reduceImage = this.reduceImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  cropImage(srcImg, srcFile) {
    const canvas = document.createElement('canvas');
    canvas.width = srcImg.naturalWidth;
    canvas.height = srcImg.naturalHeight;

    if (!isNaN(this.props.ratio)) {
      const naturalRatio = (srcImg.naturalWidth / srcImg.naturalHeight);
      if (naturalRatio - this.props.ratio < 0) {
        canvas.height = (canvas.width / this.props.ratio);
      } else {
        canvas.width = (canvas.height * this.props.ratio);
      }
    }
    const ctx = canvas.getContext('2d');
    ctx.drawImage(srcImg, (srcImg.naturalWidth - canvas.width) / -2, (srcImg.naturalHeight - canvas.height) / -2);

    const croppedImg = new Image();
    croppedImg.onload = () => {
      this.reduceImage(croppedImg, srcFile);
    };
    croppedImg.src = canvas.toDataURL();
  }

  reduceImage(img, srcFile, _scale = 1) {
    const canvas = document.createElement('canvas');
    canvas.width = (img.naturalWidth * _scale);
    canvas.height = (img.naturalHeight * _scale);

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL(srcFile.type);

    try {
      const size = dataURL.split(';base64,')[1].length * this.props.baseExpansion;

      if (size > this.props.maxSize && canvas.width * canvas.height > this.props.minArea) {
        // Keep trying until it's small enough.
        this.reduceImage(img, srcFile, _scale - this.props.reductionPerPass);
      } else {
        this.setState({ working: false });

        img.title = srcFile.name;
        if (window && window.navigator) {
          // this.props.onChange(this.props.resourceType, toBlob(dataURL), img);
        } else {
          this.props.onChange(this.props.resourceType, img);
        }
      }
    } catch (e) {
      this.setState({ working: false });

      alert('Error reducing image. Try a smaller one.');
    }
  }

  handleChange(e) {
    // TODO: why is the proxy event in an array?
    if (e[0].target.files.length !== 0) {
      const [file] = e[0].target.files;
      this.setState({ working: true });

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.cropImage(img, file);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    // TODO: Add prop to switch from using the FileButton to a button
    // that triggers modal with a media selection view of already uploaded attached images.
    // This would be for reuse with projects when they get added to pfe-lab
    const uploaderClass = (this.props.resourceSrc) ? 'image-selector__uploader--without-border' : 'image-selector__uploader';

    return (
      <div className="image-selector">
        {this.props.label &&
          <p className="image-selector__label">{this.props.label}</p>}
        <div className={uploaderClass}>
          <FileButton accept="image/*" onSelect={this.handleChange} rootStyle={{ position: "absolute" }} disabled={this.state.working} />
          {!this.props.resourceSrc && !this.state.working &&
            <p className="image-selector__placeholder">Drop an image here</p>}
          {this.props.resourceSrc &&
            <div className="image-selector__thumbnail">
              <Thumbnail src={this.props.resourceSrc} width={160} />
              {this.props.allowDelete &&
                <button
                  type="button"
                  aria-label="Delete"
                  className="image-selector__delete-button"
                  disabled={this.props.deleting}
                  onClick={this.props.onDelete.bind(null, this.props.resourceType)}
                >
                  &times;
                </button>}
            </div>}
          {this.state.working &&
            <p className="image-selector__loader">
              {this.props.loading}
            </p>}
        </div>
      </div>
    );
  }
}

ImageSelector.propTypes = {
  allowDelete: PropTypes.bool,
  baseExpansion: PropTypes.number,
  deleting: PropTypes.bool,
  label: PropTypes.string,
  loading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  minArea: PropTypes.number,
  maxSize: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  ratio: PropTypes.number,
  reductionPerPass: PropTypes.number,
  resourceSrc: PropTypes.string.isRequired,
  resourceType: PropTypes.string
};

ImageSelector.defaultProps = {
  allowDelete: false,
  baseExpansion: 3 / 4,
  deleting: false,
  loading: 'Loading...',
  maxSize: Infinity,
  minArea: 300,
  onChange: () => {},
  onDelete: () => {},
  reductionPerPass: 0.05,
  resourceSrc: '',
  ratio: NaN
};

export default ImageSelector;
