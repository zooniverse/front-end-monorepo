import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import { Grid, Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { Modal } from '@zooniverse/react-components'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function CollectionsModal ({
  active,
  children,
  closeFn
}) {
  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title={counterpart('CollectionsModal.title')}
    >
      <Grommet>
        <Grid columns={['2fr', '1fr']} gap='small' rows={['1fr']}>
          {children}
        </Grid>
      </Grommet>
    </Modal>
  )
}

CollectionsModal.propTypes = {
  active: PropTypes.bool,
  closeFn: PropTypes.func.isRequired
}

CollectionsModal.defaultProps = {
  active: false
}

export default CollectionsModal
