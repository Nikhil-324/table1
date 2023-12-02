import React from 'react';

export default function Pagination({ datasperpage, totaldatas, paginate, currentpage }) {
  const pagenumbers = [];

  for (let i = 1; i <= Math.ceil(totaldatas / datasperpage); i++) {
    pagenumbers.push(i);
  }

  return (
    <div className='pagination-container'>
      <ul className='pagination'>
        <li className='first-page' onClick={() => currentpage !== 1 && paginate(1)}>
          {currentpage !== 1 ? (
            <button>First Page</button>
          ) : (
            <button disabled>First Page</button>
          )}
        </li>
        <li className='previous' onClick={() => currentpage !== 1 && paginate(currentpage-1)}>
          {currentpage !== 1 ? (
            <button>Previous</button>
          ) : (
            <button disabled>Previous</button>
          )}
        </li>
        {pagenumbers.map((number) => (
         <li key={number} className={`page-items ${currentpage === number ? 'current-page' : ''}`}>
         <button onClick={() => paginate(number)}>
           {number}
         </button>
       </li>
        ))}
         <li className='next' onClick={() => paginate(currentpage + 1)}>
          {currentpage !== Math.ceil(totaldatas / datasperpage) ? (
            <button>Next</button>
          ) : (
            <button disabled>Next</button>
          )}
        </li>
        <li className='last-page' onClick={() => currentpage !== Math.ceil(totaldatas / datasperpage) && paginate(Math.ceil(totaldatas / datasperpage))}>
          {currentpage !== Math.ceil(totaldatas / datasperpage) ? (
            <button>Last Page</button>
          ) : (
            <button disabled>Last Page</button>
          )}
        </li>
      </ul>
    </div>
  );
}
