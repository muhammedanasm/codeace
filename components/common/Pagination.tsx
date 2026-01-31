import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
      <p className="text-xs text-gray-500 font-medium">
        Showing Page <span className="text-gray-900">{currentPage}</span> of{" "}
        <span className="text-gray-900">{totalPages}</span>
      </p>

      <div className="flex items-center gap-3">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
            {currentPage}
          </span>
        </div>

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Next Page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
