import { Box, Button, Heading } from 'grommet'
import { array, arrayOf, func, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import TeamComponent from './components/Team'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'
import Head from '../../shared/components/Head'

const StyledButton = styled(Button)`
  ${props => props.active && `
    background: none;
    font-weight: bold;
  `}
`

function Team (props) {
  const { activeFilter, className, filters, data, setActiveFilter } = props

  const allFilters = [
    { filter: '', label: 'Show all' },
    ...filters.map(filter => ({ filter, label: filter }))
  ]

  const main = (
    <article>
      <Heading margin={{ top: 'none' }} size='small'>
        Team
      </Heading>

      {data.map(team => (
        <TeamComponent data={team} key={team.name} />
      ))}
    </article>
  )

  const sidebar = (
    <Box gap='small'>
      {allFilters.map(({ filter, label }) => (
        <div key={label} >
          <StyledButton
            active={activeFilter === filter}
            label={label}
            onClick={setActiveFilter.bind(undefined, filter)}
            plain
          />
        </div>
      ))}
    </Box>
  )

  return (
    <>
      <Head
        description='Most of the time, the best way to reach the Zooniverse team, or any project teams, especially about any project-specific issues, is through the discussion boards.'
        title='Contact & Social Media'
      />
      <TwoColumnLayout
        className={className}
        main={main}
        sidebar={sidebar}
      />
    </>
  )
}

Team.propTypes = {
  activeFilter: string,
  currentView: array,
  filters: arrayOf(string),
  setActiveFilter: func
}

export default Team
