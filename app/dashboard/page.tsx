"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/common/Button";
import FilterBar from "@/components/filters/FilterBar";
import CustomTable from "@/components/common/CustomTable";
import AddProductModal from "@/components/modals/AddProductModal";
import { productService } from "@/services/productService";
import { toast } from "@/utils/alert";
import { Plus, Star } from "lucide-react";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 6;

  console.log("products", products);
  console.log("filtered", filtered);

  // data fetch
  useEffect(() => {
    console.log("System: Starting product synchronization...");
    productService
      .fetchProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        toast("Failed to connect to the product database", "error");
        setLoading(false);
      });
  }, []);

  // search and filter
  useEffect(() => {
    console.log(`Filtering: Query="${query}", Category="${cat}"`);
    let result = products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(query.toLowerCase());
      const matchCat = cat === "all" || p.category === cat;
      return matchSearch && matchCat;
    });

    setFiltered(result);
    setPage(1);
  }, [query, cat, products]);

  // pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // table headers
  const productHeaders = [
    "Product Info",
    "Description",
    "Category",
    "Price",
    "Rating",
    "Status",
  ];

  const renderProductRow = (item: Product) => (
    <>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 p-1 bg-white border border-gray-100 rounded-lg flex-shrink-0">
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="product-title-clamp font-semibold text-gray-800 text-sm line-clamp-1 max-w-[200px]">
              {item.title}
            </span>
            {/* <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              SKU: PROD-{item.id}
            </span> */}
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="description-clamp text-xs text-gray-500 line-clamp-2 max-w-[300px] leading-relaxed">
          {item.description}
        </p>
      </td>
      <td className="px-6 py-4">
        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-md capitalize">
          {item.category}
        </span>
      </td>
      <td className="px-6 py-4 font-bold text-gray-900">
        ${item.price.toFixed(2)}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1 text-sm font-medium">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span>{item.rating?.rate || "0.0"}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span className="text-xs font-medium text-green-600">Active</span>
        </div>
      </td>
    </>
  );

  const handleAddNewProduct = async (newProdData: any) => {
    try {
      console.log("newproductdata", newProdData);

      const apiResponse = await productService.addProduct(newProdData);

      setProducts((prev) => [apiResponse, ...prev]);

      setQuery("");
      setCat("all");

      toast("Product Added Successfully!", "success");
    } catch (err) {
      toast("Failed to add product to server", "error");
    }
  };

  return (
    <div className="flex bg-[#fcfcfd] min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-8 mx-auto">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Product Catalog
              </h1>
              <p className="text-gray-500 text-sm">
                Efficiently manage and search your product listings
              </p>
            </div>
            <Button
              label="Add Product"
              icon={<Plus size={18} />}
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* search and filter */}
          <FilterBar onSearch={setQuery} onFilter={setCat} />

          {/* product table */}
          <CustomTable
            headers={productHeaders}
            data={currentItems}
            loading={loading}
            renderRow={renderProductRow}
            emptyMessage={`No results found for "${query}" in this category.`}
            pagination={{
              currentPage: page,
              totalPages: totalPages,
              onPageChange: (newPage) => setPage(newPage),
            }}
          />
        </main>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddNewProduct}
      />
    </div>
  );
}
