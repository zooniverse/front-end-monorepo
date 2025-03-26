import { PlainButton, PrimaryButton } from '@zooniverse/react-components'
import { Modal } from '@zooniverse/react-components/Modal'
import { Paragraph } from 'grommet'
import { bool, func } from 'prop-types'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '@translations/i18n'

const StyledDialog = styled.dialog`
  z-index: 1000;
  border: none;
  padding: 0;
  margin: 2em 1em;
  /* override the browser default height, which is fit-content */
  height: min-content;
  /* Safari needs a minimum height, because the dialog contents use flexbox? */
  min-height: 30ch;
`

/**
 A popup which interrupts classification for subjects that are retired or already seen.

 Volunteers are offered options to choose something else to work on, or to dismiss the popup and continue anyway.

 ```
  <DisabledTaskPopup
   isOpen
   onClose={callback}
   target={parentNode}
  />
 ```
*/
export default function DisabledTaskPopup({
  isOpen = false,
  nextAvailable,
  onClose = () => true,
  reset,
}) {
  const { t } = useTranslation('components')
  const [ active, setActive ] = useState(isOpen)

  useEffect(function onLoaded() {
    setActive(isOpen)
  }, [isOpen])

  function closeModal() {
    setActive(false)
    onClose()
  }

  function onReset() {
    setActive(false)
    reset()
  }

  function onNext() {
    setActive(false)
    nextAvailable()
  }

  return (
    <StyledDialog open={active} aria-label={t('TaskArea.DisabledTaskPopup.title')}>
      <Modal
        role={undefined}
        aria-label={undefined}
        full='horizontal'
        title={t('TaskArea.DisabledTaskPopup.title')}
      >
        <Paragraph>
          {t('TaskArea.DisabledTaskPopup.body')}
        </Paragraph>
        <PlainButton
          alignSelf='center'
          onClick={onReset}
          text={t('TaskArea.DisabledTaskPopup.options.select')}
        />
        <PrimaryButton
          alignSelf='center'
          color='teal'
          label={t('TaskArea.DisabledTaskPopup.options.next')}
          onClick={onNext}
          margin='xsmall'
        />
        <PlainButton
          alignSelf='center'
          text={t('TaskArea.DisabledTaskPopup.options.dismiss')}
          onClick={closeModal}
        />
      </Modal>
    </StyledDialog>
  )
}

DisabledTaskPopup.propTypes = {
  /** open the popup on mount. */
  isOpen: bool,
  /** load the next unclassified subject */
  nextAvailable: func,
  /** callback to run when the popup closes */
  onClose: func,
  /** reset the subject store and choose a new subject */
  reset: func
}
