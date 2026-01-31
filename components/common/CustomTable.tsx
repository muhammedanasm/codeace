import React from "react";
import { PackageSearch } from "lucide-react";
import Pagination from "./Pagination";

import Loader from "./Loader";
import "../../styles/custom.css";

interface CustomTableProps {
  headers: string[];
  data: any[];
  loading: boolean;
  renderRow: (item: any) => React.ReactNode;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const CustomTable = ({
  headers,
  data,
  loading,
  renderRow,
  emptyMessage,
  pagination,
}: CustomTableProps) => {
  return (
    <div className="w-full" style={{ maxWidth: "100vw" }}>
      {/* Premium Wrapper */}
      <div className="premium-table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-32 text-gray-400"
                >
                  <Loader />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  {renderRow(item)}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="py-32 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-slate-50 p-6 rounded-full mb-4">
                      <PackageSearch size={50} className="opacity-20" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg">
                      No Items Found
                    </h3>
                    <p className="text-sm">
                      {emptyMessage ||
                        "We couldn't find any data matching your search."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && !loading && data.length > 0 && (
        <div className="px-2">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
