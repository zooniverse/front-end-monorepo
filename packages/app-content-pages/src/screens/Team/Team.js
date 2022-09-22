import counterpart from 'counterpart'
import { Box, Button, Heading } from 'grommet'
import { array, arrayOf, bool, func, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'

import Team from './components/Team'
import Head from '../../shared/components/Head'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'


const StyledLi = styled.li`
  list-style-type: none;
`

const StyledButton = styled(Button)`
  ${props => props.active && css`
    background: none;
    font-weight: bold;
  `}
`

function TeamComponent (props) {
  const { className, data, filters } = props

  const heading = (
    <Heading margin={{ top: 'none' }} size='small'>
      Our Team
    </Heading>
  )

  const main = (
    <article>
      {data && data.map(team => (
        <Team
          key={team.name}
          name={team.name}
          people={team.people}
        />
      ))}
    </article>
  )

  const sidebar = (
    <Box as='ul' gap='small'>
      {filters.map(filter => (
        <StyledLi key={filter.name}>
          <StyledButton
            active={filter.active}
            label={filter.name}
            onClick={filter.setActive}
            plain
          />
        </StyledLi>
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
        heading={heading}
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
