import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'

import addQueryParams from '@helpers/addQueryParams'

import slugify from './slugify.js'

function NoPrefetchLink(props) {
  return <Link prefetch={false} {...props} />
}

function subjectLink({ subject_id }, baseUrl) {
  const href = addQueryParams(`${baseUrl}/subject/${subject_id}`)
  return (
    <Anchor as={NoPrefetchLink} href={href}>
      <SpacedText>{subject_id}</SpacedText>
    </Anchor>
  )
}

export default function columns(customHeaders, baseUrl) {
  const headers = ['subject_id', ...customHeaders, 'status']
  return headers.map(header => {
    let render
    if (header === 'subject_id') {
      render = datum => subjectLink(datum, baseUrl)
    }
    return {
      align: 'start',
      header,
      primary: (header === 'subject_id'),
      property: slugify(header),
      render,
      search: customHeaders.includes(header),
      size: (header === 'status') ? 'xsmall' : 'small',
      sortable: true
    }
  })
}
