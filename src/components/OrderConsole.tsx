import React, { useState, useEffect } from 'react';
import { useSMM } from '../context/SMMContext';
import { PlatformCategory, SMMService } from '../types/smm';
import {
  Send,
  Layers,
  Info,
  Clock,
  ShieldCheck,
  Zap,
  AlertCircle,
  CheckCircle,
  Wallet
} from 'lucide-react';

interface OrderConsoleProps {
  onOrderSuccess: (orderId: string) => void;
}

export const OrderConsole: React.FC<OrderConsoleProps> = ({ onOrderSuccess }) => {
  const {
    services,
    user,
    formatPrice,
    placeOrder,
    placeMassOrder,
    setAddFundsModalOpen,
    prefillServiceId,
    setPrefillServiceId
  } = useSMM();

  const [mode, setMode] = useState<'single' | 'mass'>('single');

  // Single order form state
  const [selectedCategory, setSelectedCategory] = useState<PlatformCategory>('Instagram');
  const [selectedServiceId, setSelectedServiceId] = useState<number>(101);
  const [targetLink, setTargetLink] = useState('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [dripFeed, setDripFeed] = useState(false);
  const [dripRuns, setDripRuns] = useState<number>(5);
  const [dripInterval, setDripInterval] = useState<number>(60);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Mass order form state
  const [massText, setMassText] = useState(
    '101 | https://instagram.com/my_profile | 1000\n102 | https://instagram.com/p/C1294819 | 500\n203 | https://tiktok.com/@creator/video/102948 | 10000'
  );
  const [massErrors, setMassErrors] = useState<string[]>([]);

  // Synchronize when prefillServiceId changes
  useEffect(() => {
    if (prefillServiceId) {
      const match = services.find((s) => s.id === prefillServiceId);
      if (match) {
        setSelectedCategory(match.category);
        setSelectedServiceId(match.id);
        setQuantity(match.min);
      }
      setPrefillServiceId(null);
    }
  }, [prefillServiceId, services, setPrefillServiceId]);

  // Available services for the chosen category
  const availableServices = services.filter((s) => s.category === selectedCategory);
  const activeService: SMMService | undefined =
    services.find((s) => s.id === selectedServiceId) || availableServices[0];

  // Keep selectedServiceId valid when category changes
  useEffect(() => {
    if (activeService && activeService.category !== selectedCategory && availableServices.length > 0) {
      setSelectedServiceId(availableServices[0].id);
      setQuantity(availableServices[0].min);
    }
  }, [selectedCategory, activeService, availableServices]);

  const totalEffectiveQuantity = dripFeed ? quantity * dripRuns : quantity;
  const currentTotalCostUSD = activeService
    ? (activeService.ratePer1k / 1000) * totalEffectiveQuantity
    : 0;

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!activeService) return;

    if (!targetLink.trim()) {
      setErrorMsg('Please enter a target link or username.');
      return;
    }

    if (quantity < activeService.min || quantity > activeService.max) {
      setErrorMsg(
        `Quantity must be between ${activeService.min.toLocaleString()} and ${activeService.max.toLocaleString()}.`
      );
      return;
    }

    setSubmitting(true);
    const result = placeOrder(activeService.id, targetLink, totalEffectiveQuantity);
    setSubmitting(false);

    if (result.success && result.orderId) {
      setTargetLink('');
      onOrderSuccess(result.orderId);
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleMassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMassErrors([]);
    setSubmitting(true);

    const res = placeMassOrder(massText);
    setSubmitting(false);

    if (res.success) {
      setMassText('');
      onOrderSuccess('bulk');
    } else {
      setMassErrors(res.errors);
    }
  };

  return (
    <section id="order-console" className="py-12 bg-slate-900/60 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
            02. Dispatch Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Place an Order
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Submit single or mass orders with instant server verification and automatic start count tracking.
          </p>
        </div>

        {/* Mode Selector (Single vs Mass Order) */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit mb-8">
          <button
            type="button"
            onClick={() => setMode('single')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              mode === 'single'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Single Order
          </button>
          <button
            type="button"
            onClick={() => setMode('mass')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              mode === 'mass'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Mass Order (Bulk)
          </button>
        </div>

        {mode === 'single' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
              <form onSubmit={handleSingleSubmit} className="space-y-5">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as PlatformCategory)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {[
                      'Instagram',
                      'TikTok',
                      'YouTube',
                      'Telegram',
                      'Twitter',
                      'Facebook',
                      'Spotify',
                      'Discord',
                      'Website Traffic'
                    ].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Service
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => {
                      const id = parseInt(e.target.value, 10);
                      setSelectedServiceId(id);
                      const s = services.find((serv) => serv.id === id);
                      if (s && quantity < s.min) setQuantity(s.min);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {availableServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        #{service.id} - {service.name} [{formatPrice(service.ratePer1k)}/1k]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Link input */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Target Link / Username
                  </label>
                  <input
                    type="text"
                    value={targetLink}
                    onChange={(e) => setTargetLink(e.target.value)}
                    placeholder="https://instagram.com/your_handle or profile link"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <div className="mt-1 text-[11px] text-slate-400">
                    Make sure target profile or post is public before submitting.
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Quantity
                    </label>
                    {activeService && (
                      <span className="text-xs font-mono text-slate-400">
                        Min: {activeService.min.toLocaleString()} · Max: {activeService.max.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    min={activeService?.min || 10}
                    max={activeService?.max || 1000000}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 0))}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-mono tabular-nums"
                  />
                </div>

                {/* Drip-Feed toggle */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-200">Drip-Feed Option</div>
                      <div className="text-xs text-slate-400">
                        Divide order into multiple smaller runs over time.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDripFeed(!dripFeed)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        dripFeed ? 'bg-blue-600' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          dripFeed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {dripFeed && (
                    <div className="mt-4 grid grid-cols-2 gap-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Runs Count</label>
                        <input
                          type="number"
                          min={2}
                          max={30}
                          value={dripRuns}
                          onChange={(e) => setDripRuns(Math.max(2, parseInt(e.target.value, 10) || 2))}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Interval (Minutes)</label>
                        <input
                          type="number"
                          min={10}
                          max={1440}
                          value={dripInterval}
                          onChange={(e) => setDripInterval(Math.max(10, parseInt(e.target.value, 10) || 10))}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-white font-mono"
                        />
                      </div>
                      <div className="col-span-2 text-slate-400 font-mono text-[11px]">
                        Total Quantity to deliver: {(quantity * dripRuns).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-xs text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Order Summary & Submit Button */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400">Total Charge</div>
                    <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                      {formatPrice(currentTotalCostUSD)}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Dispatching...' : 'Submit Order'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Service Specs & Details Column */}
            <div className="lg:col-span-5 space-y-4">
              {activeService && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono text-blue-400 uppercase">Service Specifications</span>
                    <span className="text-xs font-mono text-slate-400">ID #{activeService.id}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {activeService.name}
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-400">Speed</span>
                      <span className="text-slate-200 font-mono">{activeService.speed}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-400">Start Delay</span>
                      <span className="text-slate-200 font-mono">{activeService.startDelay}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-400">Guarantee Policy</span>
                      <span className="text-blue-400 font-medium">{activeService.guarantee}</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-400">Average Completion</span>
                      <span className="text-slate-200 font-mono">{activeService.avgTime}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">Service Description</div>
                    {activeService.description}
                  </div>

                  {/* Wallet Check & Top-Up Card */}
                  <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-mono">Current Account Balance</div>
                      <div className="text-base font-bold font-mono text-white tabular-nums">
                        {formatPrice(user.balance)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAddFundsModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-400 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800 rounded-md transition-colors cursor-pointer"
                    >
                      + Add Funds
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Mass Order Mode */
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl max-w-4xl">
            <form onSubmit={handleMassSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  Mass Order Format: <code className="text-blue-400">service_id | link | quantity</code>
                </label>
                <textarea
                  rows={8}
                  value={massText}
                  onChange={(e) => setMassText(e.target.value)}
                  placeholder={`101 | https://instagram.com/username | 1000\n201 | https://tiktok.com/@user | 2000`}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
                />
                <div className="mt-1 text-xs text-slate-400">
                  Enter one order per line. Separate the Service ID, target link, and quantity with a pipe (<code className="text-slate-300">|</code>) character.
                </div>
              </div>

              {massErrors.length > 0 && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-xs text-rose-300 space-y-1">
                  <div className="font-semibold">Errors found in bulk orders:</div>
                  {massErrors.map((err, idx) => (
                    <div key={idx}>· {err}</div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  Available Balance: <strong className="text-white">{formatPrice(user.balance)}</strong>
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Layers className="w-4 h-4" />
                  <span>{submitting ? 'Validating Batch...' : 'Submit Mass Orders'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
