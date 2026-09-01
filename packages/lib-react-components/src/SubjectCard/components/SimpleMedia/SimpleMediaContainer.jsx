import { bool, node, number, shape, string, arrayOf, objectOf } from 'prop-types'

import MediaLink from '../MediaLink'
import SimpleMedia from './SimpleMedia'

function getMediaType(mimeType) {
	return mimeType?.split('/')[0]
}

function SimpleMediaContainer({
	linkTitle,
	placeholder,
	previewHeight,
	showAxes = false,
	showLegend = false,
	showTitle = true,
	subject,
	subjectIdTitle,
	width,
	url
}) {
	const locations = subject?.locations || []
	const firstLocation = locations[0]
	const mimeType = firstLocation ? Object.keys(firstLocation)[0] : null
	const mediaType = getMediaType(mimeType)
	const mediaSrc = firstLocation ? Object.values(firstLocation)[0] : null
	const showBackground = mediaType === 'image' || mediaType === 'video'

	return (
		<MediaLink
			href={url}
			title={linkTitle}
		>
			<SimpleMedia
				defaultMimeType={mediaType}
				mediaSrc={mediaSrc}
				placeholder={placeholder}
				previewHeight={previewHeight}
				showBackground={showBackground}
				showAxes={showAxes}
				showLegend={showLegend}
				showTitle={showTitle}
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
	showAxes: bool,
	showLegend: bool,
	showTitle: bool,
	subject: shape({
		locations: arrayOf(objectOf(string))
	}),
	subjectIdTitle: string.isRequired,
	width: number.isRequired,
	url: string.isRequired
}

export default SimpleMediaContainer
