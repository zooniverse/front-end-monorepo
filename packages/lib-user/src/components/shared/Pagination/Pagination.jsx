import { Pagination as GrommetPagination, ThemeContext } from 'grommet'

import paginationTheme from './theme'

function Pagination({ ...props }) {
  return (
    <ThemeContext.Extend value={paginationTheme}>
      <GrommetPagination {...props} />
    </ThemeContext.Extend>
  )
}

export default Pagination
