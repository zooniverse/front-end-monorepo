import { Box } from 'grommet'

export default function Content({ children, ...props }) {
  return <Box {...props} width='min(100%, 45rem)'>{children}</Box>
}
