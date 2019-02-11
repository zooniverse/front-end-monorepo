import { Markdownz, Modal, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, DataTable } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledDataTable = styled(DataTable)`
  height: auto;
`

const DatumWrapper = styled(Box)`
  word-break: break-all;
`

export function filterByLabel (label, filters) {
  if (label) {
    const firstCharacter = label.trim().charAt(0)
    if (!filters.includes(firstCharacter) && !label.slice(0, 2) !== '//') {
      return label
    }
  }

  return ''
}

export function formatValue (value) {
  if (value) {
    let stringValue = value.toString()
    stringValue.trim()
    if (stringValue.startsWith('http')) {
      return `[${stringValue}](+tab+${stringValue})`
    }
    return stringValue
  }

  return ''
}

export default function MetadataModal (props) {
  const {
    active,
    closeFn,
    filters,
    metadata,
    prefixes
  } = props

  const columns = [{
    header: <SpacedText>{counterpart('MetadataModal.table.label')}</SpacedText>,
    primary: true,
    property: 'label',
  }, {
    header: <SpacedText>{counterpart('MetadataModal.table.value')}</SpacedText>,
    property: 'value',
    render: datum => <DatumWrapper>{datum.value}</DatumWrapper>
  }]

  const filteredDataLabels = Object.keys(metadata)
    .filter((label) => filterByLabel(label, filters))

  const data = filteredDataLabels.map(label => {
    const value = formatValue(metadata[label])
    return {
      label: label.replace(RegExp(`^(${prefixes.join('|')})`), ''),
      value: <Markdownz options={{ forceInline: true }}>{value}</Markdownz>
    }
  })

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title={counterpart('MetadataModal.title')}
    >
      <StyledDataTable
        columns={columns}
        data={data}
        sortable
      />
    </Modal>
  )
}

MetadataModal.defaultProps = {
  active: false,
  closeFn: () => { },
  filters: ['#', '!'],
  prefixes: ['#', '!']
}

MetadataModal.propTypes = {
  active: PropTypes.bool,
  closeFn: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.string),
  metadata: PropTypes.object.isRequired,
  prefixes: PropTypes.arrayOf(PropTypes.string)
}
