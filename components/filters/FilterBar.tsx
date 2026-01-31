import React from "react";
import { Search } from "lucide-react";
import "../../styles/custom.css";

const FilterBar = ({ onSearch, onFilter }: any) => (
  <div className="flex gap-4 mb-6 bg-white p-4 rounded-xl border shadow-sm">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      <input
        className="premium-input-dashboard input-field pl-10"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
    <select
      className="input-field w-48 bg-white"
      onChange={(e) => onFilter(e.target.value)}
    >
      <option value="all">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelery</option>
      <option value="men's clothing">Men's Clothing</option>
    </select>
  </div>
);
export default FilterBar;
