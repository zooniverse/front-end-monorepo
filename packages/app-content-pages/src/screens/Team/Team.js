import counterpart from 'counterpart'
import { Box, Button, Heading } from 'grommet'
import { array, arrayOf, bool, func, shape, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Team from './components/Team'
import en from './locales/en'
import Head from '../../shared/components/Head'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  ${props => props.active && `
    background: none;
    font-weight: bold;
  `}
`

function TeamComponent (props) {
  const { className, data, filters } = props

  const main = (
    <article>
      <Heading margin={{ top: 'none' }} size='small'>
        Our Team
      </Heading>

      {data && data.map(team => (
        <Team
          key={team.id}
          name={team.name}
          people={team.people}
        />
      ))}
    </article>
  )

  const sidebar = (
    <Box gap='small'>
      {filters.map(filter => (
        <div key={filter.name} >
          <StyledButton
            active={filter.active}
            label={filter.name}
            onClick={filter.selectTeam}
            plain
          />
        </div>
      ))}
    </Box>
  )

  return (
    <>
      <Head
        description={counterpart('Team.description')}
        title={counterpart('Team.title')}
      />
      <TwoColumnLayout
        className={className}
        main={main}
        sidebar={sidebar}
      />
    </>
  )
}

TeamComponent.propTypes = {
  className: string,
  data: arrayOf(shape({
    id: string,
    projects: array,
    title: string
  })),
  filters: arrayOf(shape({
    active: bool,
    selectTeam: func,
    name: string
  }))
}

export default TeamComponent
