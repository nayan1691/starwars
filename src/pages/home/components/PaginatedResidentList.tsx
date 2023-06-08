import { useState } from 'react';
import ResidentList from './ResidentList';

interface CardListProps {
  residents: string[];
  pageSize: number;
}

export default function PaginatedResidentList({
  residents,
  pageSize,
}: CardListProps) {
  const [paginationStart, setPaginationStart] = useState(0);
  const residentsPerPage = residents.slice(
    paginationStart,
    paginationStart + pageSize
  );

  /* Recursive component to show pagination buttons.
     On every recursive iteration we reduce total length of residents with page size
     until total residents left are lesser than page size.
  */
  interface PaginatedButtonsProps {
    length: number;
  }
  const PaginatedButtons = ({ length }: PaginatedButtonsProps) => {
    const isSelectedPage = paginationStart === residents.length - length;
    return (
      <>
        <button
          className={`${
            isSelectedPage
              ? 'bg-blue-600 cursor-not-allowed hover:bg-blue-400'
              : ''
          }
          relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900
          ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
          onClick={() => setPaginationStart(residents.length - length)}
        >
          {(residents.length - length) / pageSize + 1}
        </button>
        {length > pageSize ? (
          <PaginatedButtons length={length - pageSize} />
        ) : null}
      </>
    );
  };

  return (
    <>
      <ResidentList residents={residentsPerPage} />
      {residents.length > pageSize ? (
        <div className="w-3/4 text-center m-auto h-12  border-gray-300 mt-8">
          <PaginatedButtons length={residents.length} />
        </div>
      ) : null}
    </>
  );
}
