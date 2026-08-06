import { Box, Image } from 'grommet'
import { number, oneOf, string } from 'prop-types'
import styled from 'styled-components'

import getThumbnailSrc from '../../../../../Media/helpers/getThumbnailSrc'
import useProgressiveImage from '../../../../../hooks/useProgressiveImage'

const InlineBox = styled.span`
	display: inline-flex;
`

function SubjectThumbnail({
	alt = '',
	fit = 'cover',
	height,
	origin = 'https://thumbnails.zooniverse.org',
	src,
	width,
	...rest
}) {
	const thumbnailSrc = getThumbnailSrc({ height, origin, src, width })
	const { error } = useProgressiveImage({ src: thumbnailSrc })
	
  const imageSrc = error ? src : thumbnailSrc
	const cssHeight = height > 0 ? `${height}px` : height
	const cssWidth = width > 0 ? `${width}px` : width
	const fallbackStyle = {
		display: 'inline-block',
		maxHeight: cssHeight,
		maxWidth: cssWidth
	}
	const boxHeight = {
		max: cssHeight
	}
	const boxWidth = {
		max: cssWidth
	}

	return (
		<>
			<Box
				as={InlineBox}
				data-testid='subject-thumbnail'
				height={boxHeight}
				width={boxWidth}
				{...rest}
			>
				<Image
					alt={alt}
					fill
					fit={fit}
					src={imageSrc}
				/>
			</Box>
			<noscript>
				<span style={fallbackStyle}>
					<img
						alt={alt}
						height='100%'
						src={imageSrc}
						style={{ objectFit: fit }}
						width='100%'
					/>
				</span>
			</noscript>
		</>
	)
}

SubjectThumbnail.propTypes = {
	alt: string,
	fit: oneOf(['contain', 'cover']),
	height: number,
	origin: string,
	src: string.isRequired,
	width: number
}

export default SubjectThumbnail
