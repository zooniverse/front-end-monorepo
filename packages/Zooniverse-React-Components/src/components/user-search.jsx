import React from 'react';
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
    this.value = this.value.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
  }

  onChange(users) {
    console.log('heyo')
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
        console.log('hey')
        if (onSearch) {
          onSearch();
        }

        return apiClient.type('users').get({ search: value, page_size: 10 })
          .then((users) => {
            users.map((user) => {
              return {
                value: user.id,
                label: `@${user.login}: ${user.display_name}`,
              };
            });
          })
          .then(options => resolve({ options }))
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
  className: React.PropTypes.string,
  debounce: React.PropTypes.number,
  multi: React.PropTypes.bool,
  onSearch: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  searchPromptText: React.PropTypes.string,
};

UserSearch.defaultProps = {
  className: 'search',
  debounce: 200,
  multi: true,
  onSearch: null,
  placeholder: 'Username:',
  searchPromptText: 'Type to search Users',
};
