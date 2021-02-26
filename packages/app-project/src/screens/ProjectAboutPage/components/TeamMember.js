import { Box, Grid } from 'grommet'
import React from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'
import { withResponsiveContext } from '@zooniverse/react-components'

const TeamMember = ({ user }) => {
  return <Box as="li">{user.id}</Box>
}

export default withResponsiveContext(TeamMember)
