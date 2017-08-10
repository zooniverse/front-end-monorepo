import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import apiClient from 'panoptes-client/lib/api-client';

const delayBy = (timeout, fn) => {
  return setTimeout(fn, timeout);
};

export default class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.queryTimeout = NaN;

    this.state = {
      users: [],
    };

    this.clear = this.clear.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.value = this.value.bind(this);
  }

  onChange(users) {
    this.setState({ users });
  }

  clear() {
    this.setState({ users: [] });
  }

  value() {
    return this.state.users;
  }

  searchUsers(value) {
    clearTimeout(this.queryTimeout);
    const onSearch = this.props.onSearch;

    if (value === '') {
      return Promise.resolve({ options: [] });
    }

    return new Promise((resolve) => {
      this.queryTimeout = delayBy(this.props.debounce, () => {
        if (onSearch) {
          onSearch();
        }

        return apiClient.type('users').get({ search: value, page_size: 10 })
          .then((users) => {
            const results = [];
            users.forEach((user) => {
              results.push({
                value: user.id,
                label: `@${user.login}: ${user.display_name}`,
              });
            });

            return results;
          })
          .then((options) => { return resolve({ options }) })
          .catch((err) => { console.error(err); });
      });

      return this.queryTimeout;
    });
  }

  render() {
    return (
      <Select.Async
        multi={this.props.multi}
        name="userids"
        value={this.state.users}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
        searchPromptText={this.props.searchPromptText}
        className={this.props.className}
        closeAfterClick={true}
        matchProp={'label'}
        loadOptions={this.searchUsers}
      />
    );
  }
}

UserSearch.propTypes = {
  className: PropTypes.string,
  debounce: PropTypes.number,
  multi: PropTypes.bool,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  searchPromptText: PropTypes.string,
};

UserSearch.defaultProps = {
  className: 'search',
  debounce: 200,
  multi: true,
  onSearch: null,
  placeholder: 'Username:',
  searchPromptText: 'Type to search Users',
};
