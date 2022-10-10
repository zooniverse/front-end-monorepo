import { PlainButton, SpacedText } from '@zooniverse/react-components'
import { debounce } from 'lodash'
import Link from 'next/link'
import { array, bool, number, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, DataTable, Heading, Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next'

import addQueryParams from '@helpers/addQueryParams'
import { columns, fetchStatuses, fetchSubjects, searchParams } from './helpers'

/*
  Grommet is opinionated about line-height and links it to font-size.
  Reset the heading baselines here so that spacing is measured from
  the tops and bottoms of the letters (without changing the text size.)
  https://matthiasott.com/notes/the-thing-with-leading-in-css
*/

export const StyledBox = styled(Box)`
  min-height: 30px;
`
export const StyledHeading = styled(Heading)`
  line-height: 100%;
`

export const SubjectDataTable = styled(DataTable)`
  button {
    padding: 0;
  }
  thead th {
    background: ${props => props.theme.global.colors[props.background.header]};
    padding: ${props => props.theme.global.edgeSize[props.pad.header]}
  }
  th button {
    color: ${props => props.theme.global.colors['dark-1']};
    font-weight: bold;
    text-transform: uppercase;
  }
  th svg {
    stroke: ${props => props.theme.global.colors['dark-1']};
  }
`

const PAGE_SIZE = 10

export default function SubjectPicker({ baseUrl, subjectSet, workflow }) {
  const { t } = useTranslation('components')
  const [ rows, setRows ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ isFetching, setIsFetching ] = useState(false)
  const [ sortField, setSortField ] = useState('priority')
  const [ sortOrder, setSortOrder ] = useState('asc')
  const { indexFields } = subjectSet.metadata
  const customHeaders = indexFields.split(',')

  rows.forEach(row => {
    row.status = t(row.status)
  })

  useEffect(function onChange() {
    async function fetchSubjectData() {
      // Resetting the rows is important when fetchSubjectData() occurs as a
      // result of changing the sort order, when the number of subjects exceeds
      // PAGE_SIZE. Otherwise, we see a "visual hiccup" where the SubjectPicker
      // first sorts the OLD set of subjects (say) 1-100, then fetches the new set
      // of subjects (say) 899-999 (with the opposite sort logic), then sorts the
      // new set.
      // See https://github.com/zooniverse/front-end-monorepo/pull/2466#issuecomment-931547044
      // for details.
      setIsFetching(true)

      const subjects = await fetchSubjects(subjectSet.id, query, sortField, sortOrder)
      const newRows = await fetchStatuses(subjects, workflow, PAGE_SIZE)
      setRows(newRows)
      setIsFetching(false)
    }

    fetchSubjectData()
  }, [query, sortField, sortOrder, subjectSet.id, workflow])

  function search(data) {
    const query = searchParams(data)
    setQuery(query)
  }

  function sort(data) {
    const { property: sortField, direction: sortOrder } = data
    if (sortField === 'status') {
      return true;
    }
    setRows([])
    setSortField(sortField)
    setSortOrder(sortOrder)
  }

  const background = {
    header: "accent-2",
    body: ["white", "light-1"]
  }
  const pad = {
    header: "xsmall",
    body: "xsmall"
  }

  /*
    Vertical spacing for the picker instructions.
    The theme's named margins are set in multiples of 10px, so set 15px explicitly.
  */
  const textMargin = {
    top: '15px',
    bottom: 'medium'
  }
  return (
    <>
      <Link
        href={addQueryParams(baseUrl)}
        passHref
      >
        <PlainButton
          text={t('SubjectPicker.back')}
        />
      </Link>
      <StyledHeading
        level={3}
        margin={{ top: 'xsmall', bottom: 'none' }}
      >
        {t('SubjectPicker.heading')}
      </StyledHeading>
      <Paragraph
        margin={textMargin}
      >
        {t('SubjectPicker.byline')}
      </Paragraph>
      <StyledBox
        background='brand'
        fill
        pad={{
          top: '5px',
          bottom: 'none',
          horizontal: 'none'
        }}
      >
        <Paragraph
          color="white"
          margin='none'
          textAlign='center'
        >
          <SpacedText
            margin='medium'
            weight='bold'
          >
            {subjectSet.display_name}
          </SpacedText>
        </Paragraph>
      </StyledBox>
      <SubjectDataTable
        background={background}
        columns={columns(customHeaders, `${baseUrl}/subject-set/${subjectSet.id}`)}
        data={rows}
        fill
        onSearch={debounce(search, 500)}
        onSort={sort}
        pad={pad}
        pin
        replace
        sortable
        step={PAGE_SIZE}
      />
      {isFetching && (
        <Paragraph textAlign="center">{t('SubjectPicker.fetching')}</Paragraph>
      )}
    </>
  )
}

SubjectPicker.propTypes = {
  /**
    Base URL for links eg. `/${owner}/${project}/classify/workflow/${workflow.id}`
  */
  baseUrl: string.isRequired,
  /**
    The selected subject set.
  */
  subjectSet: shape({
    completeness: number,
    display_name: string,
    id: string,
    subjects: array
  }),
  /**
    The selected workflow.
  */
  workflow: shape({
    completeness: number,
    default: bool,
    display_name: string,
    id: string,
    subjectSets: array
  }).isRequired
}
