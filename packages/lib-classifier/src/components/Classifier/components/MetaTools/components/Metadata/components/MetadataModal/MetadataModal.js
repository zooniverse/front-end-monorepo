import { Markdownz, Modal, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, DataTable, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import filterByLabel, { filters } from './filterByLabel'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledDataTable = styled(DataTable)`
  height: auto;

  th > div {
    padding: 0 20px;
  }

  td >  div {
    padding: 0 20px;
  }
`

const DatumWrapper = styled(Text)`
  overflow-wrap: break-word;
  word-break: break-word;
`

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

export function MetadataModal (props) {
  const {
    active,
    closeFn,
    filters,
    metadata,
    prefixes,
    theme
  } = props

  const columns = [{
    header: <SpacedText>{counterpart('MetadataModal.table.label')}</SpacedText>,
    primary: true,
    property: 'label'
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
      theme={theme}
      title={counterpart('MetadataModal.title')}
    >
      <Box height='medium' overflow='auto'>
        <StyledDataTable
          columns={columns}
          data={data}
          sortable
        />
      </Box>
    </Modal>
  )
}

MetadataModal.defaultProps = {
  active: false,
  closeFn: () => { },
  filters,
  prefixes: filters
}

MetadataModal.propTypes = {
  active: PropTypes.bool,
  closeFn: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.string),
  metadata: PropTypes.object.isRequired,
  prefixes: PropTypes.arrayOf(PropTypes.string)
}

export default withTheme(MetadataModal)
