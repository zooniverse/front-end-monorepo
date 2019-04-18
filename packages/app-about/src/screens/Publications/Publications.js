import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import { array, arrayOf, func, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Category from './components/Category'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'
import Head from '../../shared/components/Head'

const StyledButton = styled(Button)`
  ${props => props.active && `
    background: none;
    font-weight: bold;
  `}
`

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

function Publications (props) {
  const { activeFilter, className, filters, data, setActiveFilter } = props

  const allFilters = [
    { filter: '', label: 'Show all' },
    ...filters.map(filter => ({ filter, label: filter }))
  ]

  const main = (
    <article>
      <Heading margin={{ top: 'none' }} size='small'>
        Publications
      </Heading>

      <Paragraph>
        To submit a new publication or update an existing one, <Anchor href={FORM_URL}>please use this form</Anchor>. We aim to post links to published papers that can be accessed by the public. Articles accepted for publication but not yet published are also fine.
      </Paragraph>

      {data.map(category => (
        <Category data={category} key={category.name} />
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
        description='The Zooniverse is the world’s largest and most popular platform for people-powered research. This research is made possible by volunteers — hundreds of thousands of people around the world who come together to assist professional researchers.'
        title='What is the Zooniverse?'
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
  activeFilter: string,
  currentView: array,
  filters: arrayOf(string),
  setActiveFilter: func
}

export default Publications
