import { Anchor, Box, DataTable, Text } from 'grommet'
import { arrayOf, bool, func, object, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../../../translations/i18n'
import Markdownz from '../../../Markdownz'
import Modal from '../../../Modal'
import SpacedText from '../../../SpacedText'
import filterByLabel, { filters as defaultFilters } from './filterByLabel'

const StyledDataTable = styled(DataTable)`
  height: auto;

  th > div {
    padding: 0 20px;
  }

  td > div {
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
  const stringValue = value?.toString()?.trim()

  if (stringValue?.startsWith('http')) {
    return (
      <Anchor href={value} rel='nofollow noopener noreferrer' target='_blank'>
        {value}
      </Anchor>
    )
  }

  if (stringValue) {
    return <Markdownz inline>{stringValue}</Markdownz>
  }

  if (value === null) {
    return 'null'
  }

  return ''
}

function MetadataModal({
  active = false,
  closeFn = () => true,
  filters = defaultFilters,
  metadata = {},
  prefixes = defaultFilters
}) {
  const { t } = useTranslation()

  const columns = [{
    header: <SpacedText>{t('MetadataIconButton.table.label')}</SpacedText>,
    primary: true,
    property: 'label'
  }, {
    header: <SpacedText>{t('MetadataIconButton.table.value')}</SpacedText>,
    property: 'value',
    render: function renderValue(datum) {
      return <DatumWrapper>{datum.value}</DatumWrapper>
    }
  }]

  const visibleLabels = Object.keys(metadata).filter(function filterLabel(label) {
    return filterByLabel(label, filters)
  })

  const data = visibleLabels.map(function mapLabel(label) {
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
      title={t('MetadataIconButton.modalTitle')}
    >
      <Box height='medium' overflow='auto'>
        <StyledDataTable
          columns={columns}
          data={data}
          pad='15px'
          sortable
        />
      </Box>
    </Modal>
  )
}

MetadataModal.propTypes = {
  active: bool,
  closeFn: func,
  filters: arrayOf(string),
  metadata: object,
  prefixes: arrayOf(string)
}

export default MetadataModal
