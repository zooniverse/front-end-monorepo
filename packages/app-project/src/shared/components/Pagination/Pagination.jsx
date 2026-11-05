import { Pagination as GrommetPagination, ThemeContext } from 'grommet'
import { func, number } from 'prop-types'

const paginationTheme = {
  pagination: {
    button: {
      active: {
        background: {
          color: 'accent-1'
        },
        color: 'neutral-1'
      }
    }
  }
}

const defaultSetPage = () => true

function Pagination({
  pageCount = 1,
  page = 1,
  setPage = defaultSetPage
}) {
  return (
    <ThemeContext.Extend value={paginationTheme}>
      <GrommetPagination
        alignSelf='center'
        margin={{ vertical: 'small' }}
        page={page}
        numberItems={pageCount}
        onChange={({ page }) => setPage(page)}
        step={1}
      />
    </ThemeContext.Extend>
  )
}

Pagination.propTypes = {
  pageCount: number,
  page: number,
  setPage: func
}

export default Pagination
