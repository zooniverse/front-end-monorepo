import { Bookmark } from 'grommet-icons'
import { string } from 'prop-types'
import { useState } from 'react'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'
import CollectionsModal from './components/CollectionsModal'

function CollectIconButton({
  projectId,
  subjectId,
  userId,
  ...props
}) {
  const [collectionsModalActive, setCollectionsModalActive] = useState(false)
  
  const { t } = useTranslation()
  
  function handleCollectionsModal() {
    setCollectionsModalActive(!collectionsModalActive)
  }

  return (
    <>
      <CollectionsModal
        collectionsModalActive={collectionsModalActive}
        projectId={projectId}
        setCollectionsModalActive={setCollectionsModalActive}
        subjectId={subjectId}
        userId={userId}
      />
      <IconActionButton
        a11yTitle={t('CollectIconButton.collect')}
        icon={<Bookmark />}
        onClick={handleCollectionsModal}
        {...props}
      />
    </>
  )
}

CollectIconButton.propTypes = {
  projectId: string,
  subjectId: string.isRequired,
  userId: string.isRequired
}

export default CollectIconButton
