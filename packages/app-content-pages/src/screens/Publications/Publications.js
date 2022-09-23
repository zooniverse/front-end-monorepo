import counterpart from 'counterpart'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { array, arrayOf, bool, func, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'

import Category from './components/Category'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'
import Head from '../../shared/components/Head'

const StyledLi = styled.li`
  list-style-type: none;
`

const StyledButton = styled(Button)`
  ${props => props.active && css`
    background: none;
    font-weight: bold;
  `}
`
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

function Publications ({
  className,
  data,
  filters
}) {
  const heading = (
    <section>
      <Heading margin={{ top: 'none' }} size='small'>
        Publications
      </Heading>

      <Paragraph>
        To submit a new publication or update an existing one, <Anchor href={FORM_URL}>please use this form</Anchor>. We aim to post links to published papers that can be accessed by the public. Articles accepted for publication but not yet published are also fine.
      </Paragraph>
    </section>
  )

  const main = (
    <article>

      {data.map(category => (
        <Category
          key={category.title}
          title={category.title}
          projects={category.projects}
          slug={category.slug}
        />
      ))}
    </article>
  )

  const sidebar = (
    <Box as='ul' gap='small'>
      {filters.map(filter => (
        <StyledLi key={filter.name} >
          <Link
            href={ filter.slug ? `#${filter.slug}` : '' }
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
        description={counterpart('Publications.description')}
        title={counterpart('Publications.title')}
      />
      <TwoColumnLayout
        heading={heading}
        className={className}
        main={main}
        sidebar={sidebar}
      />
    </>
  )
}

Publications.propTypes = {
  className: string,
  data: arrayOf(shape({
    id: string,
    projects: array,
    title: string
  })),
  filters: arrayOf(shape({
    active: bool,
    setActive: func,
    title: string
  }))
}

export default Publications
