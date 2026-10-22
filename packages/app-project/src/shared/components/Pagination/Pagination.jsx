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

function Pagination({ pageCount, page, setPage }) {
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
  pageCount: number.isRequired,
  page: number.isRequired,
  setPage: func.isRequired
}

export default Pagination
