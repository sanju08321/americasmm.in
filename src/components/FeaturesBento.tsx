import React from 'react';
import { useSMM } from '../context/SMMContext';
import { Zap, ShieldCheck, Database, CreditCard, ArrowRight } from 'lucide-react';

export const FeaturesBento: React.FC = () => {
  const { formatPrice, setAddFundsModalOpen } = useSMM();

  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
            05. Core Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Engineered for Creators, Agencies & Resellers
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            AmericaSMM operates direct automated infrastructure without broker overhead, delivering high-retention engagement at transparent wholesale prices.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Direct Main Provider (Col-span 7) */}
          <div className="md:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
            <div className="p-6">
              <div className="text-xs font-mono text-blue-400 mb-2">01. Source Infrastructure</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Direct Main Provider Source
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Unlike reseller panels that stack retail markups, AmericaSMM connects directly to primary server pools. Enjoy wholesale rates starting at {formatPrice(0.001)} per 1,000 interactions with immediate throughput.
              </p>
            </div>

            <div className="px-6 pb-6">
              <div className="relative rounded-lg overflow-hidden border border-slate-800 h-52">
                <img
                  src="/src/assets/images/feature_creator_studio_1792909103185.jpg"
                  alt="Content creator studio using AmericaSMM distribution"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-white">
                  Verified Engagement Pools · Real Accounts
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: High-Speed Automated API (Col-span 5) */}
          <div className="md:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
            <div className="p-6">
              <div className="text-xs font-mono text-blue-400 mb-2">02. Automated Dispatch</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Sub-Second API Processing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect via standard SMM REST API v2. Automated order intake, immediate balance checking, and real-time status webhooks make reselling completely hands-free.
              </p>
            </div>

            <div className="px-6 pb-6">
              <div className="relative rounded-lg overflow-hidden border border-slate-800 h-52">
                <img
                  src="/src/assets/images/feature_global_cloud_1792909102066.jpg"
                  alt="AmericaSMM high-speed server cluster"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-white">
                  Latency: 48ms · 99.98% Service Uptime
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: 365 Days Refill Guarantee (Col-span 6) */}
          <div className="md:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-blue-400 mb-2">03. Quality Assurance</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Algorithmic Refill & Retention System
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Social media platforms update their algorithms frequently. AmericaSMM guarantees non-drop performance with 30-day to 365-day auto-refill triggers accessible directly in your dashboard or via API.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                One-Click Refill Button
              </span>
              <span className="font-mono text-slate-400">30 - 365 Days Warranties</span>
            </div>
          </div>

          {/* Card 4: Global Flexible Payments (Col-span 6) */}
          <div className="md:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-blue-400 mb-2">04. Flexible Treasury</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Instant Multi-Currency Deposits
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Deposit funds globally using Credit/Debit Cards, USDT (TRC-20), Bitcoin, PayPal, Cash App, and instant UPI transfers. Automatic currency conversion into USD, INR, EUR, or GBP.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="text-emerald-400 font-mono font-medium">
                Instant Automatic Credit
              </span>
              <button
                type="button"
                onClick={() => setAddFundsModalOpen(true)}
                className="text-xs text-blue-400 hover:text-white font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Deposit Funds</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
