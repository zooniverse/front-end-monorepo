import NavLink from '@shared/components/NavLink'

function subjectLink({ subject_id }, baseUrl) {
  const href = `${baseUrl}/subject/${subject_id}`
  const link = {
    href,
    text: subject_id
  }
  return <NavLink link={link} />
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
      property: header,
      render,
      search: customHeaders.includes(header),
      size: (header === 'status') ? 'xsmall' : 'small',
      sortable: true
    }
  })
}
