import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayNameSlugEditor extends Component {
  constructor(props) {
    super(props);
    this.getResourceUrl = this.getResourceUrl.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.undoNameChange = this.undoNameChange.bind(this);
    this.warnURLChange = this.warnURLChange.bind(this);
    this.state = {
      value: '',
      url: null,
      warn: false,
    };
  }

  componentDidMount() {
    this.getResourceUrl(this.props.resource);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resource !== nextProps.resource) {
      this.getResourceUrl(nextProps.resource);
    }
  }

  getResourceUrl(resource) {
    const { resourceType } = this.props;
    this.setState({ value: resource.display_name, url: `/${resourceType}s/${resource.slug}` });
  }

  value() {
    return this.state.value;
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({ value });
    this.warnURLChange(this.props.resource, value);
  }

  undoNameChange() {
    this.setState({ value: this.props.resource.display_name, warn: false });
  }

  warnURLChange(resource, displayNameInputValue) {
    const warn = resource.display_name !== displayNameInputValue &&
      (resource.slug.match(/(untitled-project)/i) === null ||
        resource.slug.match(/(untitled-organization)/i) === null);

    if (warn) {
      this.setState({ warn });
    }
  }

  render() {
    const { state, undoNameChange } = this;
    const { resource, resourceType } = this.props;
    return (
      <p className={`${this.props.className}`}>
        <label htmlFor="display_name">
          <span className={`${this.props.className}__form-label`}>Name</span>
          <br />
          <input
            type="text"
            className={`${this.props.className}__form-input`}
            disabled={resource.live || !!resource.listed_at}
            id="display_name"
            name="display_name"
            onChange={this.handleInputChange}
            ref={(node) => { this.input = node; }}
            value={this.state.value}
          />
        </label>

        {(state.warn)
          ? <small className={`${this.props.className}__form-help`}>
              You’re changing the url of your {resourceType}. Users with bookmarks and links in Talk will no longer work.
              {' '}
              <button type="button" onClick={undoNameChange}>
                Cancel
              </button>
              {' '}
            </small>
          : null
        }

        {(state.url)
          ? <small className={`${this.props.className}__form-help`}>
              {(resource.live || !!resource.listed_at)
                ? `You cannot change a live ${resourceType}'s name.`
                : `The ${resourceType} name is the first thing people will see about the ${resourceType}, and it will show up in the ${resourceType} URL. Try to keep it short and sweet.`
              }
              {' '}
              Your {resourceType}’s URL is
              {' '}
              <a href={this.props.origin + state.url}>
                {this.props.origin + state.url}
              </a>
            </small>
          : null
        }
      </p>
    );
  }

}

DisplayNameSlugEditor.propTypes = {
  className: PropTypes.string,
  origin: PropTypes.string,
  resource: PropTypes.shape({
    display_name: PropTypes.string,
    listed_at: PropTypes.string,
    live: PropTypes.bool,
  }),
  resourceType: PropTypes.string,
};

DisplayNameSlugEditor.defaultProps = {
  className: 'slug-editor',
  origin: window.location.origin,
  resource: {},
  resourceType: '',
};

export default DisplayNameSlugEditor;
