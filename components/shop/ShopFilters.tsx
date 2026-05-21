"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ShopFiltersProps {
  categories: string[];
  selectedCategory: string;
  selectedSort: string;
}

export function ShopFilters({
  categories,
  selectedCategory,
  selectedSort,
}: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (sort === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-violet-600 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="sm:ml-auto">
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#13131f] border border-white/10 text-white focus:outline-none focus:border-violet-500 cursor-pointer"
        >
          <option value="featured" className="bg-[#13131f] text-white">Featured</option>
          <option value="price-low" className="bg-[#13131f] text-white">Price: Low to High</option>
          <option value="price-high" className="bg-[#13131f] text-white">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
