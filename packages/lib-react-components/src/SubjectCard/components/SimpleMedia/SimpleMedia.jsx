import { Box } from 'grommet'
import { bool, node, number, string, oneOf } from 'prop-types'
import styled from 'styled-components'

import Media from '../../../Media'

const StyledPreview = styled(Box)`
	overflow: hidden;
	position: relative;
`

const StyledBackground = styled(Box)`
	filter: blur(12px);
	inset: 0;
	position: absolute;
	transform: scale(1.2); // scale up the background to hide edges created by the blur
	z-index: 0;
`

const StyledForegroundMedia = styled(Media)`
	position: relative;
	z-index: 1;
`

const StyledTitle = styled(Box)`
	align-items: flex-end;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
	bottom: 0;
	height: 72px;
	left: 0;
	padding: 15px 5px;
	position: absolute;
	right: 0;
	text-align: center;
	z-index: 2;
`

const StyledTitleText = styled.span`
	color: ${props => props.theme.global.colors.white};
	font-size: 0.9rem;
	font-weight: 400;
	letter-spacing: 0.8px;
	line-height: 1.2;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 1);
`

function SimpleMedia({
	defaultMimeType = 'image',
	mediaSrc,
	placeholder,
	previewHeight,
	showAxes = false,
	showTitle = false,
	showBackground,
	showLegend = false,
	subjectIdTitle,
	width
}) {
	return (
		<StyledPreview
			height={`${previewHeight}px`}
			round={{ corner: 'top', size: '8px' }}
			width={`${width}px`}
		>
			{(mediaSrc && showBackground) ? (
				<StyledBackground>
					<Media
						alt=''
						aria-hidden='true'
						controls={false}
						defaultMimeType={defaultMimeType}
						fit='cover'
						height={previewHeight}
						showPoster={true}
						src={mediaSrc}
						tabIndex={-1}
						width={width}
					/>
				</StyledBackground>
			) : null}

			{mediaSrc ? (
				<StyledForegroundMedia
					alt={subjectIdTitle}
					controls={false}
					defaultMimeType={defaultMimeType}
					fit='contain'
					height={previewHeight}
					placeholder={placeholder}
					showAxes={showAxes}
					showLegend={showLegend}
					showPoster={true}
					src={mediaSrc}
					width={width}
				/>
			) : null}

			{showTitle ? (
				<StyledTitle
					direction='row'
					gap='xsmall'
					justify='center'
				>
					<StyledTitleText>
						{subjectIdTitle}
					</StyledTitleText>
				</StyledTitle>
			) : null}
		</StyledPreview>
	)
}

SimpleMedia.propTypes = {
	defaultMimeType: oneOf(['application', 'audio', 'image', 'text', 'video']),
	mediaSrc: string,
	placeholder: node,
	previewHeight: number.isRequired,
	showAxes: bool,
	showTitle: bool,
	showBackground: bool,
	showLegend: bool,
	subjectIdTitle: string.isRequired,
	width: number.isRequired
}

export default SimpleMedia
