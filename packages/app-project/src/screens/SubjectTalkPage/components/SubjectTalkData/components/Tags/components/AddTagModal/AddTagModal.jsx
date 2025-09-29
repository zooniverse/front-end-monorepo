import { Modal, SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'

import TagList from '../TagList'

function AddTagModal({
  active = false,
  disabled = false,
  onClose,
  onTagClick,
  projectDisplayName,
  tags = []
}) {
  return (
    <Modal
      active={active}
      closeFn={onClose}
      headingBackground='transparent'
      role='dialog'
      round='8px'
      title='Add a Popular Tag'
      titleColor='black'
    >
      <Box>
        <SpacedText size='small'>
          {`From ${projectDisplayName}`}
        </SpacedText>
        <TagList
          disabled={disabled}
          onTagClick={onTagClick}
          tags={tags}
        />
      </Box>
    </Modal>
  )
}

export default AddTagModal
