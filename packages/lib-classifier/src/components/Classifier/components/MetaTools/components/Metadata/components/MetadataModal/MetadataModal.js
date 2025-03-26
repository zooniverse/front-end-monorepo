import { Markdownz, Modal, SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, DataTable, Text } from 'grommet'
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

  & > p {
    margin: 0;
  }
`

export function formatValue(value) {
  const stringValue = value?.toString()
  stringValue?.trim()
  if (stringValue?.startsWith('http')) {
    return <Anchor target='_blank' rel='nofollow noopener noreferrer' href={value}>{value}</Anchor>
  }
  if (stringValue) {
    return <Markdownz inline>{stringValue}</Markdownz>
  }

  if (value === null) {
    return 'null'
  }

  return ''
}

export default function MetadataModal ({
  active = false,
  closeFn = () => true,
  filters = defaultFilters,
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
      value
    }
  })

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title={t('MetaTools.MetadataModal.title')}
      trapFocus={true}
    >
      <Box height='medium' overflow='auto'>
        <StyledDataTable
          pad='15px'
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
