import mime from 'mime/lite'
import { node, number, shape, string, arrayOf, objectOf } from 'prop-types'

import StaticMedia from './StaticMedia'

function StaticMediaContainer({
	placeholder,
	previewHeight,
	subject,
	subjectIdTitle,
	width
}) {
	const locations = subject?.locations || []
	const mediaSrc = locations[0] ? Object.values(locations[0])[0] : null
	const mimeType = mediaSrc ? mime.getType(mediaSrc) : null
	const mediaType = mimeType ? mimeType.split('/')[0] : null
	const showBackground = mediaType === 'image' || mediaType === 'video'

	return (
		<StaticMedia
			mediaSrc={mediaSrc}
			placeholder={placeholder}
			previewHeight={previewHeight}
			showBackground={showBackground}
			subjectIdTitle={subjectIdTitle}
			width={width}
		/>
	)
}

StaticMediaContainer.propTypes = {
	placeholder: node,
	previewHeight: number.isRequired,
	subject: shape({
		locations: arrayOf(objectOf(string))
	}),
	subjectIdTitle: string.isRequired,
	width: number.isRequired
}

export default StaticMediaContainer
