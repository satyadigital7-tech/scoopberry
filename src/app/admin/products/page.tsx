'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  Sparkles,
  Flame,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, toggleProductStatus } =
    useAdminStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: 399,
    mrp: 599,
    discount: 33,
    stock: 20,
    sku: 'SB-001',
    category: 'Cute Finds',
    categorySlug: 'cute-finds',
    tags: 'cute, stationery',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    isBestSeller: false,
    isNewArrival: true,
    isFeatured: false,
    isMystery: false,
    status: 'published' as 'published' | 'draft',
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      price: 399,
      mrp: 599,
      discount: 33,
      stock: 20,
      sku: `SB-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Cute Finds',
      categorySlug: 'cute-finds',
      tags: 'cute, gift',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      isBestSeller: false,
      isNewArrival: true,
      isFeatured: false,
      isMystery: false,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription || '',
      price: p.price,
      mrp: p.mrp,
      discount: p.discount,
      stock: p.stock,
      sku: p.sku,
      category: p.category,
      categorySlug: p.categorySlug,
      tags: p.tags.join(', '),
      imageUrl: p.images[0] || '',
      isBestSeller: !!p.isBestSeller,
      isNewArrival: !!p.isNewArrival,
      isFeatured: !!p.isFeatured,
      isMystery: !!p.isMystery,
      status: p.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = formData.tags.split(',').map((t) => t.trim()).filter(Boolean);
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        slug,
        description: formData.description,
        shortDescription: formData.shortDescription,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        discount: Number(formData.discount),
        stock: Number(formData.stock),
        sku: formData.sku,
        category: formData.category,
        categorySlug: formData.categorySlug,
        tags: tagArray,
        images: [formData.imageUrl],
        isBestSeller: formData.isBestSeller,
        isNewArrival: formData.isNewArrival,
        isFeatured: formData.isFeatured,
        isMystery: formData.isMystery,
        status: formData.status,
      });
    } else {
      addProduct({
        name: formData.name,
        slug,
        description: formData.description,
        shortDescription: formData.shortDescription,
        price: Number(formData.price),
        mrp: Number(formData.mrp),
        discount: Number(formData.discount),
        stock: Number(formData.stock),
        sku: formData.sku,
        category: formData.category,
        categorySlug: formData.categorySlug,
        tags: tagArray,
        images: [formData.imageUrl],
        rating: 5.0,
        reviewCount: 1,
        isBestSeller: formData.isBestSeller,
        isNewArrival: formData.isNewArrival,
        isFeatured: formData.isFeatured,
        isMystery: formData.isMystery,
        status: formData.status,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Product Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, update, pricing, stock, and publish status for all scoops and items.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#E83E68] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#d63059] flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">SKU / Cat</th>
                <th className="px-6 py-3.5">Price / MRP</th>
                <th className="px-6 py-3.5">Stock</th>
                <th className="px-6 py-3.5">Badges</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image src={p.images[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate max-w-xs">{p.name}</p>
                        <p className="text-[11px] text-slate-400 truncate max-w-xs">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <p className="font-semibold text-slate-800">{p.sku}</p>
                    <p className="text-[11px] text-slate-400">{p.category}</p>
                  </td>
                  <td className="px-6 py-3.5">
                    <p className="font-bold text-slate-900">₹{p.price}</p>
                    <p className="text-[11px] text-slate-400 line-through">₹{p.mrp}</p>
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md ${
                        p.stock <= 5
                          ? 'bg-red-50 text-red-600'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {p.isBestSeller && (
                        <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                          Best Seller
                        </span>
                      )}
                      {p.isNewArrival && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                      {p.isMystery && (
                        <span className="text-[10px] bg-purple-50 text-purple-600 font-bold px-2 py-0.5 rounded-full">
                          Mystery
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <button
                      onClick={() => toggleProductStatus(p.id)}
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase transition-colors ${
                        p.status === 'published'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence teaser"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => {
                      const sel = categories.find((c) => c.slug === e.target.value);
                      setFormData({
                        ...formData,
                        categorySlug: e.target.value,
                        category: sel ? sel.name : 'Cute Finds',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#E83E68]"
                  />
                </div>
              </div>

              {/* Badges toggles */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded text-[#E83E68] focus:ring-[#E83E68]"
                  />
                  <span className="font-bold text-slate-700">Best Seller 🔥</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="rounded text-[#E83E68] focus:ring-[#E83E68]"
                  />
                  <span className="font-bold text-slate-700">New Arrival 🍓</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-[#E83E68] focus:ring-[#E83E68]"
                  />
                  <span className="font-bold text-slate-700">Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isMystery}
                    onChange={(e) => setFormData({ ...formData, isMystery: e.target.checked })}
                    className="rounded text-[#E83E68] focus:ring-[#E83E68]"
                  />
                  <span className="font-bold text-slate-700">Mystery Scoop</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E83E68] text-white font-bold hover:bg-[#d63059] shadow-sm"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
