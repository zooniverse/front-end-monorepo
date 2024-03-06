import { Modal } from '@zooniverse/react-components'
import { bool, func, string } from 'prop-types'

function GroupModal({
  active = false,
  children,
  handleClose,
  title = '',
  titleColor = 'black'
}) {
  return (
    <Modal
      aria-label={title}
      aria-modal='true'
      active={active}
      bodyBackground='transparent'
      closeFn={handleClose}
      headingBackground='transparent'
      plain={true}
      role='dialog'
      round='8px'
      title={title}
      titleColor={titleColor}
    >
      {children}
    </Modal>
  )
}

GroupModal.propTypes = {
  active: bool,
  handleClose: func.isRequired,
  title: string,
  titleColor: string
}

export default GroupModal
