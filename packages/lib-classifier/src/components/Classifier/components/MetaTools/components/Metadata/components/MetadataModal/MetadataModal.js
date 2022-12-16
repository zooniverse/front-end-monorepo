import { Markdownz, Modal, SpacedText } from '@zooniverse/react-components'
import { Box, DataTable, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import filterByLabel, { filters as defaultFilters } from './filterByLabel'
import { useTranslation } from '@translations/i18n'

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
    const stringValue = value.toString()
    stringValue.trim()
    if (stringValue.startsWith('http')) {
      return `[${stringValue}](+tab+${stringValue})`
    }
    return stringValue
  }

  if (value === null) return 'null'

  return ''
}

export default function MetadataModal ({
  active = false,
  closeFn = () => true,
  filters,
  metadata,
  prefixes = defaultFilters
}) {
  const { t } = useTranslation('components')

  const columns = [{
    header: <SpacedText>{t('MetaTools.MetadataModal.table.label')}</SpacedText>,
    primary: true,
    property: 'label'
  }, {
    header: <SpacedText>{t('MetaTools.MetadataModal.table.value')}</SpacedText>,
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
      title={t('MetaTools.MetadataModal.title')}
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

MetadataModal.propTypes = {
  active: PropTypes.bool,
  closeFn: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.string),
  metadata: PropTypes.object.isRequired,
  prefixes: PropTypes.arrayOf(PropTypes.string)
}
