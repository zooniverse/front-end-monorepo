import React from 'react';
import updateQueryParams from '../lib/update-query-params';

const pageOption = n =>
  <option key={n} value={n}>
    {n}
  </option>;

const Paginator = ({
  className,
  firstAndLast,
  firstLabel,
  itemCount,
  lastLabel,
  nextLabel,
  onClickNext,
  onClickPrev,
  onPageChange,
  page,
  pageCount,
  pageKey,
  pageSelector,
  previousLabel,
  router,
  totalItems,
}) => {
  let pageChange;
  if (router && !onPageChange) {
    pageChange = (activePage) => {
      const queryChange = {};
      queryChange[pageKey] = activePage;
      updateQueryParams(router, queryChange);
    };
  } else {
    pageChange = onPageChange;
  }

  let clickPrev;
  if (onClickPrev) {
    clickPrev = () => {
      onClickPrev(page);
    };
  } else {
    clickPrev = () => {
      pageChange(page - 1);
    };
  }

  let clickNext;
  if (onClickNext) {
    clickNext = () => {
      onClickNext(page);
    };
  } else {
    clickNext = () => {
      pageChange(page + 1);
    };
  }

  const paginatorClassName = `paginator ${className}`.trim();

  return (
    <div className={paginatorClassName}>
      {firstAndLast &&
        (<button
          type="button"
          id="first"
          className="paginator-button"
          onClick={() => pageChange(1)}
          disabled={page === 1}
        >
          {firstLabel}
        </button>)}

      <button
        type="button"
        id="previous"
        className="paginator-button"
        disabled={page === 1}
        onClick={() => clickPrev()}
      >
        {previousLabel}
      </button>

      {pageSelector &&
        (<div className="paginator-page-selector">
          PAGE
          <select
            value={page}
            onChange={(e) => { pageChange(e.target.value); }}
          >
            {[...Array(pageCount).keys()].map(i => pageOption(i + 1))}
          </select> OF {pageCount}
        </div>)}

      {itemCount && totalItems &&
        (<div className="paginator-page-selector">
          {totalItems}
        </div>)}

      <button
        type="button"
        id="next"
        className="paginator-button"
        disabled={page === pageCount}
        onClick={() => clickNext()}
      >
        {nextLabel}
      </button>

      {firstAndLast &&
        (<button
          type="button"
          id="last"
          className="paginator-button"
          onClick={() => pageChange(pageCount)}
          disabled={page === pageCount}
        >
          {lastLabel}
        </button>)}

    </div>
  );
};

Paginator.defaultProps = {
  className: '',
  firstAndLast: true,
  firstLabel: <span className="paginator-label"><span className="paginator-icon">&laquo;</span> first</span>,
  itemCount: false,
  lastLabel: <span className="paginator-label">last <span className="paginator-icon">&raquo;</span></span>,
  nextLabel: <span className="paginator-label">next <span className="paginator-icon">&rsaquo;</span></span>,
  page: 1,
  pageKey: 'page',
  pageSelector: true,
  previousLabel: <span className="paginator-label"><span className="paginator-icon">&lsaquo;</span> previous</span>,
};

Paginator.propTypes = {
  className: React.PropTypes.string,
  firstAndLast: React.PropTypes.bool,
  firstLabel: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]),
  itemCount: React.PropTypes.bool,
  lastLabel: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]),
  nextLabel: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]),
  onClickNext: React.PropTypes.func,
  onClickPrev: React.PropTypes.func,
  onPageChange: React.PropTypes.func,
  page: React.PropTypes.number,
  pageCount: React.PropTypes.number,
  pageKey: React.PropTypes.string,
  pageSelector: React.PropTypes.bool,
  previousLabel: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
  totalItems: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.string,
  ]),
};

export default Paginator;
