import { Modal } from '@zooniverse/react-components'

function AddTagModal({
  active = false,
  children,
  handleClose
}) {
  return (
    <Modal
      active={active}
      closeFn={handleClose}
      headingBackground='transparent'
      role='dialog'
      round='8px'
      title='Add a Popular Tag'
      titleColor='black'
    >
      {children}
    </Modal>
  )
}

export default AddTagModal
