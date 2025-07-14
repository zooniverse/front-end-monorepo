import styled from 'styled-components';
import { Blank } from 'grommet-icons';

const StyledBlank = styled(Blank)`
  circle {
    fill: ${props => (props.theme.dark ? props.theme.global.colors['neutral-6'] : props.theme.global.colors['dark-5'])};
  }

  // right half of the circle
  path {
    fill: ${props => (props.theme.dark ? props.theme.global.colors['dark-5'] : props.theme.global.colors['neutral-6'])};
  }
`;

export default function InvertIcon(props) {
  return (
    <StyledBlank viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="16" r="15" strokeWidth={1.5} />
      <path d="M16,1.5c6.6,0,14.5,5.4,14.5,14.5s-5.4,14.5-14.5,14.5" />
    </StyledBlank>
  );
}
