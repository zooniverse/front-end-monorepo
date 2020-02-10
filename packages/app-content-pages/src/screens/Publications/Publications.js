import counterpart from 'counterpart'
import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { array, arrayOf, bool, func, shape, string } from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import Category from './components/Category'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'
import Head from '../../shared/components/Head'

const StyledButton = styled(Button)`
  ${props => props.active && css`
    background: none;
    font-weight: bold;
  `}
`
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

function Publications (props) {
  const { className, data, filters } = props

  const main = (
    <article>
      <Heading margin={{ top: 'none' }} size='small'>
        Publications
      </Heading>

      <Paragraph>
        To submit a new publication or update an existing one, <Anchor href={FORM_URL}>please use this form</Anchor>. We aim to post links to published papers that can be accessed by the public. Articles accepted for publication but not yet published are also fine.
      </Paragraph>

      {data.map(category => (
        <Category
          key={category.title}
          title={category.title}
          projects={category.projects}
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
            onClick={filter.setActive}
            plain
          />
        </div>
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
