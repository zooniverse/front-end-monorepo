import { arrayOf, bool, func, node, number, objectOf, shape, string } from 'prop-types'

import MediaContainer from '../MediaContainer'
import SimpleMedia from './SimpleMedia'

function getMediaType(mimeType) {
	return mimeType?.split('/')[0]
}

function SimpleMediaContainer({
	linkTitle,
	placeholder,
	previewHeight,
	selectProps,
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
		<MediaContainer
			href={url}
			selectProps={selectProps}
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
		</MediaContainer>
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
