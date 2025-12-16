import { Pagination as GrommetPagination, ThemeContext } from 'grommet'

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

function Pagination({ numProjects, page, pageSize, setPage }) {
  return (
    <ThemeContext.Extend value={paginationTheme}>
      <GrommetPagination
        alignSelf='center'
        margin={{ top: 'medium' }}
        page={page}
        numberItems={numProjects}
        onChange={({ page }) => setPage(page)}
        step={pageSize}
      />
    </ThemeContext.Extend>
  )
}

export default Pagination
