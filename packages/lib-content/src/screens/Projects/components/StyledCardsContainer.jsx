import styled from 'styled-components'

const StyledCardsContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  column-gap: 20px;
  row-gap: 20px;

  @media (min-width: 48rem) {
    column-gap: 40px;
    row-gap: 40px;
  }

  @media (min-width: 90rem) {
    row-gap: 40px;
    column-gap: 40px;
  }
`

export default StyledCardsContainer
