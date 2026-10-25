import React from 'react';
import { useSMM } from '../context/SMMContext';
import { ArrowRight, ShieldCheck, Zap, Server, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { formatPrice, setAddFundsModalOpen } = useSMM();

  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background radial gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Subtitle Kicker (Clean unboxed text, no pills) */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <span className="text-blue-400 font-semibold tracking-wider uppercase">americasmm.in</span>
          <span aria-hidden="true">·</span>
          <span>Main Provider SMM Panel</span>
          <span aria-hidden="true">·</span>
          <span>Fast Automated API v2</span>
        </div>

        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              The World's Fastest SMM Panel & Reseller Gateway
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              AmericaSMM delivers direct wholesale social media services for Instagram, TikTok,
              YouTube, Telegram, and X. Automated instant order dispatch, 365-day refill protection,
              and seamless API v2 integration for digital marketing agencies and high-volume resellers.
            </p>

            {/* Quick Proof Highlights (Clean text with checks, no pill badges) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Direct Provider Source from {formatPrice(0.001)}/k</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Instant Auto-Refill Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Card, Crypto, PayPal & UPI Deposits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>RESTful JSON API with 99.98% SLA</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('order')}
                className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/25 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Place New Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View Full Service Catalog</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
              <img
                src="/src/assets/images/hero_smm_network_1792909101861.jpg"
                alt="AmericaSMM global analytics and automated dispatch center"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white">Live Operations Command</span>
                  <span className="font-mono text-emerald-400">Dispatch: Online</span>
                </div>
                <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                  <span>Average Processing: 1.2s</span>
                  <span className="font-mono">Server Load: 18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in a full-width row below hero split */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              5,420,000+
            </div>
            <div className="text-xs text-slate-400 mt-1">Orders Delivered</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono tabular-nums">
              148,000+
            </div>
            <div className="text-xs text-slate-400 mt-1">Registered Clients & Agencies</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              0.05s
            </div>
            <div className="text-xs text-slate-400 mt-1">Instant API Response Time</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
              99.98%
            </div>
            <div className="text-xs text-slate-400 mt-1">System Uptime Guarantee</div>
          </div>
        </div>

        {/* Live Order Activity Feed Bar */}
        <div className="mt-6 py-2 px-3.5 bg-slate-900/50 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs text-slate-400 overflow-hidden">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            <span className="text-slate-500 font-mono uppercase text-[11px]">Latest Orders:</span>
            <span>#AS-89501 · 5,000 Instagram Followers</span>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <span>#AS-89502 · 25,000 YouTube High Retention Views</span>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <span>#AS-89503 · 10,000 TikTok FYP Likes</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-400 shrink-0 ml-4 hidden sm:inline">
            Active Nodes: US-East, EU-Central, AP-South
          </span>
        </div>
      </div>
    </section>
  );
};
