import mime from 'mime/lite'
import { node, number, shape, string, arrayOf, objectOf } from 'prop-types'

import MediaLink from '../MediaLink'
import SimpleMedia from './SimpleMedia'

function SimpleMediaContainer({
	linkTitle,
	placeholder,
	previewHeight,
	subject,
	subjectIdTitle,
	width,
	url
}) {
	const locations = subject?.locations || []
	const mediaSrc = locations[0] ? Object.values(locations[0])[0] : null
	const mimeType = mediaSrc ? mime.getType(mediaSrc) : null
	const mediaType = mimeType ? mimeType.split('/')[0] : null
	const showBackground = mediaType === 'image' || mediaType === 'video'

	return (
		<MediaLink
			href={url}
			title={linkTitle}
		>
			<SimpleMedia
				mediaSrc={mediaSrc}
				placeholder={placeholder}
				previewHeight={previewHeight}
				showBackground={showBackground}
				subjectIdTitle={subjectIdTitle}
				width={width}
			/>
		</MediaLink>
	)
}

SimpleMediaContainer.propTypes = {
	linkTitle: string.isRequired,
	placeholder: node,
	previewHeight: number.isRequired,
	subject: shape({
		locations: arrayOf(objectOf(string))
	}),
	subjectIdTitle: string.isRequired,
	width: number.isRequired,
	url: string.isRequired
}

export default SimpleMediaContainer
