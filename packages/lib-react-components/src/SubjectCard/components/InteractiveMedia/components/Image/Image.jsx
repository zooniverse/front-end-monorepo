import { Box, Image } from 'grommet'
import { number, oneOf, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import getSubjectThumbnailSrc from '../../../../helpers/getSubjectThumbnailSrc'

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
	const thumbnailSrc = getSubjectThumbnailSrc({ height, origin, src, width }) || src
	const [imageSrc, setImageSrc] = useState(thumbnailSrc)

	useEffect(() => {
		setImageSrc(thumbnailSrc)
		const image = new window.Image()
		image.src = thumbnailSrc
		image.onerror = () => setImageSrc(src)

		return () => {
			image.onerror = null
		}
	}, [src, thumbnailSrc])

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
