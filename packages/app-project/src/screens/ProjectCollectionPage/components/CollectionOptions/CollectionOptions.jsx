import { Box, Notification } from 'grommet'
import { Layer, SettingsOption } from 'grommet-icons'
import { ZooniverseLogotype } from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next/pages'
import { bool } from 'prop-types'
import { useState } from 'react'

import OptionButton from './components/OptionButton'

function CollectionOptions({
  canEdit = false,
  isLoggedIn = false
}) {
  const { t } = useTranslation('screens')
  const [shareVisible, setShareVisible] = useState(false)

  async function onShare() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareVisible(true)
    } catch (error) {
      console.error(error.message)
    }
  }

  function onSettings() {
    // placeholder for collection settings
    window.alert('Collection settings...')
  }

  return (
    <Box
      align='center'
      background='neutral-1'
      fill='horizontal'
      height='64px'
    >
      <Box
        align='center'
        direction='row'
        fill
        gap='small'
        justify={isLoggedIn ? 'end' : 'between'}
        pad={{ horizontal: '20px' }}
        width={{ width: '100%', max: '85rem' }}
      >
        <OptionButton
          icon={<Layer color='white' size='small' />}
          label={t('Collection.CollectionOptions.share')}
          onClick={onShare}
        />
        {isLoggedIn && canEdit && (
          <OptionButton
            icon={<SettingsOption color='white' size='small' />}
            label={t('Collection.CollectionOptions.settings')}
            onClick={onSettings}
          />
        )}
        {!isLoggedIn && (
          <Box aria-hidden='true'>
            <ZooniverseLogotype id='collection-options-logotype' width={200} role='presentation' color='white' />
          </Box>
        )}
      </Box>
      {shareVisible && (
        <Notification
          message={t('Collection.CollectionOptions.copied')}
          onClose={() => setShareVisible(false)}
          time={4000}
          toast
        />
      )}
    </Box>
  )
}

CollectionOptions.propTypes = {
  canEdit: bool,
  isLoggedIn: bool
}

export default CollectionOptions
