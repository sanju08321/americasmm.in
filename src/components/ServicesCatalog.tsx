import React, { useState, useMemo } from 'react';
import { useSMM } from '../context/SMMContext';
import { PlatformCategory, SMMService } from '../types/smm';
import { Search, Eye, ShoppingCart, Filter, Sparkles, RefreshCw } from 'lucide-react';

interface ServicesCatalogProps {
  onSelectOrder: (serviceId: number) => void;
}

const CATEGORIES: PlatformCategory[] = [
  'All',
  'Instagram',
  'TikTok',
  'YouTube',
  'Telegram',
  'Twitter',
  'Facebook',
  'Spotify',
  'Discord',
  'Website Traffic'
];

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onSelectOrder }) => {
  const { services, formatPrice, setSelectedServiceModal } = useSMM();
  const [selectedCategory, setSelectedCategory] = useState<PlatformCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.id.toString().includes(q) ||
        s.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <section id="services-catalog" className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
              01. Wholesale Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Social Media Marketing Services
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Browse AmericaSMM's full catalog of automated services with guaranteed start times and non-drop refill protection.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or service name..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter Bar (Interactive functional buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Table Container */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3.5 w-16">ID</th>
                  <th scope="col" className="px-4 py-3.5">Service Name</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap text-right">Rate / 1000</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap text-right">Min / Max</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">Avg Time</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">Refill Policy</th>
                  <th scope="col" className="px-4 py-3.5 text-center w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      No services found matching your query "{searchQuery}".
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      className="hover:bg-slate-850/60 transition-colors group"
                    >
                      {/* ID */}
                      <td className="px-4 py-3.5 font-mono text-slate-400">
                        #{service.id}
                      </td>

                      {/* Name & Details */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {service.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {service.description}
                        </div>
                      </td>

                      {/* Rate per 1k */}
                      <td className="px-4 py-3.5 text-right font-mono font-bold text-emerald-400 tabular-nums">
                        {formatPrice(service.ratePer1k)}
                      </td>

                      {/* Min / Max */}
                      <td className="px-4 py-3.5 text-right font-mono text-slate-300 tabular-nums">
                        {service.min.toLocaleString()} / {service.max.toLocaleString()}
                      </td>

                      {/* Avg Time */}
                      <td className="px-4 py-3.5 text-slate-300 whitespace-nowrap">
                        {service.avgTime}
                      </td>

                      {/* Refill Policy (Clean unboxed text, no candy pills) */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-[11px] text-slate-300">
                          {service.refillDays === 'Lifetime' ? (
                            'Lifetime Refill'
                          ) : typeof service.refillDays === 'number' ? (
                            `${service.refillDays} Days Refill`
                          ) : (
                            'No Refill'
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedServiceModal(service)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                            title="View Full Description"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectOrder(service.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Order</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer of Table */}
          <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredServices.length} of {services.length} services</span>
            <span className="font-mono text-slate-500">API Endpoint: /api/v2 (action=services)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
