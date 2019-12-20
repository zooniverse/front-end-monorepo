import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import locationValidator from '../../helpers/locationValidator'
import getViewer from '../../helpers/getViewer'

import { Button, Box, List, Text, Icons } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'

const StyledH3= styled.h3`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

const StyledControlButton = styled(Button)`
  &:focus {
    background: #7fcbce
  }
`

const StyledButtons = styled.button`
  box-sizing: border-box;
  border: 3px solid transparent;
  background: #FFFFFF;
  margin: 5px 5px 5px 5px;
  padding: 0;
  line-height: 0;
  &:hover {
    box-sizing: border-box;
    border: 3px solid #F0B200;
  }
  &:focus {
    box-sizing: border-box;
    border: 3px solid #F0B200;
    outline: none;
  }
`

const StyledImage = styled.img`
  height: 3em;
  width: 3em;
  float: center;
  object-fit: cover;
  padding: 0;
`

const StyledHiddenSpan = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

class FrameCarousel extends React.Component {
  constructor () {
    super()
    // current frame
  }

  render () {
    const locations = this.props.subject.locations.map( location => ({"url": location["image/jpeg"]}))
    const locationElements = locations.map((location, index) => {
      return (
        <li key={index} className={`frame-${index}`}>
          <StyledButtons
            key={index}
            value={index}
            data-slide={index}
          >
            <StyledImage
              src={location.url}
              alt="Thumbnail of Image"
            />
          </StyledButtons>
        </li>
      )
    })

    return (
      <Box
        className="frames-container"
        align="center"
        alignContent="around"
        background={"#FFFFFF"}
        direction="column"
        flex="grow"
        responsive={true}
      >
        <StyledH3 id="subjectcarousel" className="visuallyhidden">
          Carousel of Subjects
        </StyledH3>
        <StyledControlButton
          alignSelf="center"
          a11yTitle="Click to see the previous frame"
          hoverIndicator={true, {color: "#7fcbce"}}
          focusIndicator={true, {color: "#7fcbce"}}
          icon={<FormUp />}
          primary
        />
        <Box
          align="center"
          alignContent="center"
          as="ul"
          background="#FFFFFF"
          border={false}
          direction="column"
          height="100%"
          pad="0"
          overflow="scroll"
        >
          {locationElements}
        </Box>
        <StyledControlButton
          alignSelf="center"
          a11yTitle="Click to see the next frame"
          hoverIndicator={true, {color: "#7fcbce"}}
          focusIndicator={true, {color: "#7fcbce"}}
          icon={<FormDown />}
          primary
        />
      </Box>
    )
  }
}

FrameCarousel.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator),
  })
}

export default FrameCarousel
