import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import locationValidator from '../../helpers/locationValidator'
import getViewer from '../../helpers/getViewer'

import { Button, Box, Text, Icons } from 'grommet'
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

const StyledUnorderedList = styled.ul`
  align-items: center;
  align-content: center;
  background: #FFFFFF;
  list-style: none;
  display: flex;
  flex-grow: 20;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  padding: 0;
  overflow-y: auto;
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
  &:focus: {
    box-sizing: border-box;
    border: 3px solid #F0B200;
    outline: none;
  }
`

const StyledImage = styled.img`
  height: 40px;
  width: 40px;
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
    const locations = this.props.subject.locations

    return (
      <Box
        className="frames-container"
        align="center"
        alignContent="around"
        background={"#FFFFFF"}
        direction="column"
        flex="grow"
        height="100%"
        responsive={true}
      >
        <StyledH3 id="subjectcarousel" className="visuallyhidden">
          Carousel of Subjects
        </StyledH3>
        <Button
          alignSelf="center"
          a11yTitle="Click to see the previous frame"
          hoverIndicator={true, {color: "#addde0"}}
          icon={<FormUp />}
          onClick={() => {}}
          primary
        />
        <StyledUnorderedList className="frames-list">
          {locations.map((frame, index) => (
            <li key={index} className={`frame-${index}`}>
              <StyledButtons
                key={index}
                value={index}
                data-slide={index}
              >
                <StyledImage
                  src={frame["image/jpeg"]}
                  alt="Thumbnail of Image"
                />
              </StyledButtons>
            </li>
          ))}
        </StyledUnorderedList>
        <Button
          alignSelf="center"
          a11yTitle="Click to see the next frame"
          hoverIndicator={true, {color: "#addde0"}}
          icon={<FormDown />}
          onClick={() => {}}
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

FrameCarousel.defaultProps = {
}

export default FrameCarousel
