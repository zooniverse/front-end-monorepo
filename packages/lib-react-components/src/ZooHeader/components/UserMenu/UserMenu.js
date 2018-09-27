import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'grommet';
import { FormDown } from 'grommet-icons'

import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'

import counterpart from 'counterpart'
import en from './locales/en'

import SpacedText from '../../../SpacedText'

counterpart.registerTranslations('en', en)

// Grommet v2 components currently can't extend their inner Box styles...
// https://github.com/grommet/grommet/issues/2004
// Manually adjust the inner Box div's padding using styled-components
const StyledUserMenu = styled(Menu)`
  ${'' /* > div:first-child {
    padding: 0;
  } */}
`

export default function UserMenu({ user }) {
  // Support staging urls...
  const host = (process.env.NODE_ENV === 'staging') ? window.location.origin : 'https://www.zooniverse.org'
  const userDisplayName = <SpacedText color="#B2B2B2" weight="bold" size="xsmall">{user.display_name}</SpacedText>
  const userMenuNavListItems = [
    { label: counterpart('UserMenu.userNavListLabels.profile'), href: `${host}/users/${user.login}` },
    { label: counterpart('UserMenu.userNavListLabels.settings'), href: `${host}/settings` },
    { label: counterpart('UserMenu.userNavListLabels.collections'), href: `${host}/collections/${user.login}` },
    { label: counterpart('UserMenu.userNavListLabels.favorites'), href: `${host}/favorites/${user.login}` }
  ]
  return (
    <Menu
      dropBackground={zooTheme.global.colors.teal}
      icon={<FormDown color="#B2B2B2" size="xsmall" />}
      items={userMenuNavListItems}
      label={userDisplayName}
    />
  );
};

UserMenu.defaultProps = {
  user: { display_name: '' }
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    display_name: PropTypes.string,
    login: PropTypes.string
  }).isRequired
};