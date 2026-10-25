import React from 'react';
import { useSMM } from '../../context/SMMContext';
import { X, ShoppingCart, Clock, Zap, ShieldCheck } from 'lucide-react';

interface ServiceDetailModalProps {
  onOrderNow: (serviceId: number) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ onOrderNow }) => {
  const { selectedServiceModal, setSelectedServiceModal, formatPrice } = useSMM();

  if (!selectedServiceModal) return null;

  const s = selectedServiceModal;

  const handleOrderClick = () => {
    onOrderNow(s.id);
    setSelectedServiceModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
        <button
          type="button"
          onClick={() => setSelectedServiceModal(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
            Service Details · ID #{s.id}
          </div>
          <h3 className="text-lg font-bold text-white">
            {s.name}
          </h3>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            Platform: <strong className="text-slate-200">{s.category}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400 font-mono text-[11px]">Wholesale Rate</div>
            <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
              {formatPrice(s.ratePer1k)} <span className="text-xs font-normal text-slate-400">/ 1,000</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400 font-mono text-[11px]">Min / Max Order</div>
            <div className="text-sm font-bold font-mono text-white tabular-nums">
              {s.min.toLocaleString()} / {s.max.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400 font-mono text-[11px]">Start Delay</div>
            <div className="text-xs font-mono text-slate-200">{s.startDelay}</div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-slate-400 font-mono text-[11px]">Delivery Speed</div>
            <div className="text-xs font-mono text-slate-200">{s.speed}</div>
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
          <div className="text-slate-400 font-mono text-[11px] mb-1">Guarantee & Refill Policy</div>
          <div className="text-blue-400 font-medium">{s.guarantee}</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <div className="text-slate-400 font-mono text-[11px] mb-1">Full Service Description</div>
          {s.description}
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setSelectedServiceModal(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleOrderClick}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Place Order Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
