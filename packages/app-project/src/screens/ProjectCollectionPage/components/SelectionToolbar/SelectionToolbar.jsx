import { SpacedText } from '@zooniverse/react-components'
import { Box, Button, CheckBox } from 'grommet'
import { Bookmark, Checkbox, CheckboxSelected, Trash } from 'grommet-icons'
import { useTranslation } from 'next-i18next/pages'
import { bool, func, number } from 'prop-types'

const DEFAULT_HANDLER = () => {}

function ToolLabel({ children, icon, pressed = false }) {
  return (
    <Box
      align='center'
      background={pressed ? 'neutral-1' : 'white'}
      direction='row'
      elevation={pressed ? 'xsmall' : 'none'}
      gap='10px'
      justify='center'
      pad={{ horizontal: '20px', vertical: '12px' }}
      round='20px'
    >
      {icon}
      <SpacedText color={pressed ? 'white' : 'dark-5'} size='14px'>
        {children}
      </SpacedText>
    </Box>
  )
}

function SelectionToolbar({
  allSelected = false,
  canAdd = false,
  canDelete = false,
  isSelecting = false,
  onAdd = DEFAULT_HANDLER,
  onDelete = DEFAULT_HANDLER,
  onSelectAll = DEFAULT_HANDLER,
  onToggleSelecting = DEFAULT_HANDLER,
  selectedCount = 0
}) {
  const { t } = useTranslation('screens')
  const hasSelection = selectedCount > 0

  return (
    <Box
      align='center'
      direction='row'
      gap='small'
      wrap
    >
      {isSelecting ? (
        <CheckBox
          checked={allSelected}
          label={<SpacedText color='dark-5' size='12px'>{t('Collection.selectAll')}</SpacedText>}
          onChange={event => onSelectAll(event.target.checked)}
          toggle
        />
      ) : null}
      {isSelecting && canAdd ? (
        <Button
          disabled={!hasSelection}
          onClick={onAdd}
          plain
        >
          <ToolLabel icon={<Bookmark aria-hidden='true' size='16px' />}>
            {t('Collection.addToCollection')}
          </ToolLabel>
        </Button>
      ) : null}
      {isSelecting && canDelete ? (
        <Button
          disabled={!hasSelection}
          onClick={onDelete}
          plain
        >
          <ToolLabel icon={<Trash aria-hidden='true' size='16px' />}>
            {t('Collection.delete')}
          </ToolLabel>
        </Button>
      ) : null}
      <Button
        aria-pressed={isSelecting}
        onClick={onToggleSelecting}
        plain
      >
        <ToolLabel
          icon={isSelecting
            ? <CheckboxSelected aria-hidden='true' color='white' size='16px' />
            : <Checkbox aria-hidden='true' size='16px' />}
          pressed={isSelecting}
        >
          {t('Collection.selectSubjects')}
        </ToolLabel>
      </Button>
    </Box>
  )
}

SelectionToolbar.propTypes = {
  allSelected: bool,
  canAdd: bool,
  canDelete: bool,
  isSelecting: bool,
  onAdd: func,
  onDelete: func,
  onSelectAll: func,
  onToggleSelecting: func,
  selectedCount: number
}

export default SelectionToolbar
