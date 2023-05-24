import { Box, Button, Heading } from 'grommet'
import Link from 'next/link'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

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

function TeamComponent ({
  className = '',
  data = [],
  filters = []
}) {
  const { t } = useTranslation('components')

  const heading = (
    <Heading margin={{ top: 'none' }} size='small'>
      {t('Team.title')}
    </Heading>
  )

  const main = (
    <article>
      {data && data.map(team => (
        <Team
          key={team.name}
          name={team.name}
          people={team.people}
          slug={team.slug}
        />
      ))}
    </article>
  )

  const sidebar = (
    <Box as='ul' gap='small'>
      {filters.map(filter => (
        <StyledLi key={filter.name}>
          <Link
            href={filter.slug ? `#${filter.slug}` : ''}
            passHref
          >
            <StyledButton
              active={filter.active}
              label={filter.name}
              onClick={filter.setActive}
              plain
            />
          </Link>
        </StyledLi>
      ))}
    </Box>
  )

  return (
    <>
      <Head
        description={t('Team.description')}
        title={t('Team.title')}
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
    name: string,
    people: array,
    slug: string,
    weight: number
  })),
  filters: arrayOf(shape({
    active: bool,
    selectTeam: func,
    name: string
  }))
}

export default TeamComponent
