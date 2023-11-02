import { Box } from 'grommet'

export default function Content({ children }) {
  return <Box width='min(100%, 45rem)'>{children}</Box>
}
