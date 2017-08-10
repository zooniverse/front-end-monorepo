import React from 'react';
import PropTypes from 'prop-types';
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
  selectionText,
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
          </select>{selectionText} {pageCount}
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
  selectionText: 'OF'
};

Paginator.propTypes = {
  className: PropTypes.string,
  firstAndLast: PropTypes.bool,
  firstLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  itemCount: PropTypes.bool,
  lastLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  nextLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  onClickNext: PropTypes.func,
  onClickPrev: PropTypes.func,
  onPageChange: PropTypes.func,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  pageKey: PropTypes.string,
  pageSelector: PropTypes.bool,
  previousLabel: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  selectionText: PropTypes.string,
  totalItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default Paginator;
