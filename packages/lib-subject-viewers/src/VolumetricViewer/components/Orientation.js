import styled from 'styled-components'

const SVG_ARROW = '48 50, 48 15, 40 15, 50 0, 60 15, 52 15, 52 50'

const StyledSVG = styled.svg`
  height: 60px;
  width: 88px;
  
  .blue {
    fill: #235DFF;
  }
  .green {
    fill: #1ED359;
  }
  .red {
    fill: #E45950;
  }
`

const StyledText = styled.text`
  font-size: 24px;
`

export const Orientation = () => {
  return (
    <StyledSVG viewBox='-10 0 115 100'>
      <polygon
        className='blue'
        points={SVG_ARROW}
        transform='rotate(0 0 0)'
      />
      <StyledText
        className='blue'
        textAnchor='middle'
        x='30'
        y='20'
      >Z</StyledText>

      <polygon
        className='green'
        points={SVG_ARROW}
        transform='rotate(135 50 50)'
      />
      <StyledText
        className='green'
        textAnchor='middle'
        x='95'
        y='85'
      >Y</StyledText>

      <polygon
        className='red'
        points={SVG_ARROW}
        transform='rotate(225 50 50)'
      />
      <StyledText
        className='red'
        textAnchor='middle'
        x='5'
        y='85'
      >X</StyledText>
    </StyledSVG>
  )
}
