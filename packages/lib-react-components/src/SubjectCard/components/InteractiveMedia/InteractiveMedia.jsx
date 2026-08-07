import { bool, node, number, string } from 'prop-types'

import SimpleMedia from '../SimpleMedia/SimpleMedia'

function InteractiveMedia({
  mediaSrc,
  placeholder,
  previewHeight,
  showBackground,
  subjectIdTitle,
  width
}) {
  if (!mediaSrc) return null

  return (
    <SimpleMedia
      mediaSrc={mediaSrc}
      placeholder={placeholder}
      previewHeight={previewHeight}
      showBackground={showBackground}
      showTitle={false}
      subjectIdTitle={subjectIdTitle}
      width={width}
    />
  )
}

InteractiveMedia.propTypes = {
  mediaSrc: string,
  placeholder: node,
  previewHeight: number.isRequired,
  showBackground: bool,
  subjectIdTitle: string.isRequired,
  width: number.isRequired
}

export default InteractiveMedia
