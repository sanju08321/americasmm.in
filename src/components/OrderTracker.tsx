import React, { useState, useMemo } from 'react';
import { useSMM } from '../context/SMMContext';
import { OrderStatus, SMMOrder } from '../types/smm';
import { Search, RotateCcw, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface OrderTrackerProps {
  highlightOrderId?: string;
}

const STATUS_FILTERS: Array<'All' | OrderStatus> = [
  'All',
  'Pending',
  'In Progress',
  'Processing',
  'Completed',
  'Canceled'
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({ highlightOrderId }) => {
  const { orders, formatPrice, requestRefill, setSupportModalOpen } = useSMM();
  const [selectedStatus, setSelectedStatus] = useState<'All' | OrderStatus>('All');
  const [searchQuery, setSearchQuery] = useState(highlightOrderId || '');

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        o.orderId.toLowerCase().includes(q) ||
        o.serviceName.toLowerCase().includes(q) ||
        o.link.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, selectedStatus, searchQuery]);

  return (
    <section id="order-tracker" className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
              03. Live Telemetry
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Order Tracking & Logs
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Inspect real-time order execution status, start count verification, and trigger instant auto-refill requests.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by Order ID (e.g. AS-89412)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {STATUS_FILTERS.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Orders Table Container */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3.5">Order ID</th>
                  <th scope="col" className="px-4 py-3.5">Date</th>
                  <th scope="col" className="px-4 py-3.5">Service Details</th>
                  <th scope="col" className="px-4 py-3.5">Target Link</th>
                  <th scope="col" className="px-4 py-3.5 text-right whitespace-nowrap">Quantity</th>
                  <th scope="col" className="px-4 py-3.5 text-right whitespace-nowrap">Charge</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">Status</th>
                  <th scope="col" className="px-4 py-3.5 text-center">Refill / Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-400">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const delivered = Math.max(0, order.quantity - order.remains);
                    const pct = Math.min(100, Math.round((delivered / order.quantity) * 100));

                    return (
                      <tr
                        key={order.orderId}
                        className={`hover:bg-slate-850/60 transition-colors ${
                          highlightOrderId === order.orderId ? 'bg-blue-950/30' : ''
                        }`}
                      >
                        {/* Order ID */}
                        <td className="px-4 py-3.5 font-mono font-bold text-white whitespace-nowrap">
                          #{order.orderId}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3.5 font-mono text-slate-400 whitespace-nowrap">
                          {order.createdAt}
                        </td>

                        {/* Service Details */}
                        <td className="px-4 py-3.5 max-w-xs">
                          <div className="font-medium text-slate-200 line-clamp-1">
                            {order.serviceName}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Start Count: <span className="font-mono text-slate-300">{order.startCount.toLocaleString()}</span> · Remains: <span className="font-mono text-slate-300">{order.remains.toLocaleString()}</span>
                          </div>
                        </td>

                        {/* Target Link */}
                        <td className="px-4 py-3.5 font-mono text-slate-400 max-w-[200px] truncate">
                          <a
                            href={order.link.startsWith('http') ? order.link : `https://${order.link}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-400 underline decoration-slate-600 transition-colors inline-flex items-center gap-1"
                          >
                            <span className="truncate">{order.link}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-3.5 text-right font-mono text-slate-200 tabular-nums whitespace-nowrap">
                          {order.quantity.toLocaleString()}
                        </td>

                        {/* Charge */}
                        <td className="px-4 py-3.5 text-right font-mono font-semibold text-emerald-400 tabular-nums whitespace-nowrap">
                          {formatPrice(order.charge)}
                        </td>

                        {/* Status + Progress */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-medium ${
                                order.status === 'Completed'
                                  ? 'text-emerald-400'
                                  : order.status === 'In Progress'
                                  ? 'text-blue-400'
                                  : order.status === 'Processing'
                                  ? 'text-amber-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              {order.status}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                              ({pct}%)
                            </span>
                          </div>
                          <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                order.status === 'Completed'
                                  ? 'bg-emerald-500'
                                  : order.status === 'In Progress'
                                  ? 'bg-blue-500'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          {order.refillEligible ? (
                            <button
                              type="button"
                              onClick={() => requestRefill(order.orderId)}
                              className="px-2.5 py-1 text-xs font-mono font-medium text-blue-400 hover:text-white bg-blue-950/50 hover:bg-blue-900/60 border border-blue-800/60 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Trigger Auto-Refill"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Refill</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSupportModalOpen(true)}
                              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                            >
                              Support
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Tracking {orders.length} active order records</span>
            <span className="font-mono text-slate-500">Live Webhook Synced</span>
          </div>
        </div>
      </div>
    </section>
  );
};
