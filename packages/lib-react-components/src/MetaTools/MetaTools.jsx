import { Box } from 'grommet'
import { bool, func, objectOf, string } from 'prop-types'

import FavoritesIconButton from '../FavoritesIconButton'
import CollectIconButton from '../CollectIconButton'
import ShareIconButton from '../ShareIconButton'
import InvertIconButton from '../InvertIconButton'
import ImageIconButton from '../ImageIconButton'

const DEFAULT_LOCATION = {}

function MetaTools({
  invert = false,
  location = DEFAULT_LOCATION,
  login,
  onInvert = null,
  projectId,
  projectSlug,
  subjectId,
  userId,
  ...rest
}) {
  const [mimeType, subjectURL] = Object.entries(location)[0]
  const isImage = mimeType?.includes('image')
  
  return (
    <Box
      align='center'
      direction='row'
      flex={false}
      gap='xsmall'
      justify='center'
      pad='xsmall'
      {...rest}
    >
      <FavoritesIconButton
        disabled={!login}
        login={login}
        projectId={projectId}
        projectSlug={projectSlug}
        subjectId={subjectId}
      />
      <CollectIconButton
        disabled={!login}
        projectId={projectId}
        subjectId={subjectId}
        userId={userId}
      />
      <ShareIconButton />
      {onInvert ? (
        <InvertIconButton
          checked={invert}
          onClick={onInvert}
        />
      ) : null}
      {isImage ? (
        <ImageIconButton
          href={subjectURL}
        />
      ) : null}
    </Box>
  )
}

MetaTools.propTypes = {
  invert: bool,
  location: objectOf(string),
  login: string,
  onInvert: func,
  projectId: string,
  projectSlug: string,
  subjectId: string,
  userId: string
}

export default MetaTools
