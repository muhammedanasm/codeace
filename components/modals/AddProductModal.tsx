"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PackagePlus } from "lucide-react";
import "../../styles/custom.css";

// validation
const schema = z.object({
  title: z.string().min(3, "Product title is too short"),
  price: z.coerce.number().min(1, "Please enter a valid price"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
});

export default function AddProductModal({ isOpen, onClose, onAdd }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleResetAndClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: any) => {
    console.log("submit data->", data);
    onAdd({
      ...data,
      id: Date.now(),
      image: "https://via.placeholder.com/150",
      rating: { rate: 0, count: 0 },
    });
    handleResetAndClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleResetAndClose();
      }}
    >
      <DialogContent className="premium-modal-content sm:max-w-[480px]">
        <div className="modal-header-accent">
          <DialogHeader>
            <div className="modal-icon-container">
              <PackagePlus size={24} />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Create New Entry
            </DialogTitle>
            <DialogDescription className="text-slate-500 mt-1">
              Add a new product to your global inventory.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-form-container"
        >
          {/* Title Field */}
          <div className="form-group">
            <label className="form-label">Product Title</label>
            <input
              {...register("title")}
              className={`premium-input ${errors.title ? "border-red-500 bg-red-50" : ""}`}
              placeholder="product name here..."
            />
            {errors.title && (
              <p className="text-red-500 text-[11px] mt-1 font-semibold animate-in fade-in slide-in-from-top-1">
                {errors.title.message as string}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price Field */}
            <div className="form-group">
              <label className="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                className={`premium-input ${errors.price ? "border-red-500 bg-red-50" : ""}`}
              />
              {errors.price && (
                <p className="text-red-500 text-[11px] mt-1 font-semibold">
                  {errors.price.message as string}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                {...register("category")}
                className={`premium-input ${errors.category ? "border-red-500 bg-red-50" : ""}`}
              >
                <option value="">Select...</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-[11px] mt-1 font-semibold">
                  {errors.category.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              {...register("description")}
              className={`premium-input min-h-[100px] resize-none ${errors.description ? "border-red-500 bg-red-50" : ""}`}
              placeholder="Describe the item..."
            />
            {errors.description && (
              <p className="text-red-500 text-[11px] mt-1 font-semibold">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="btn-discard"
            >
              Discard
            </button>
            <button type="submit" className="btn-save">
              Create Product
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
