import React from 'react';
import { useSMM } from '../context/SMMContext';
import { Shield, Mail, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { setSupportModalOpen } = useSMM();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                America<span className="text-blue-500">SMM</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                americasmm.in
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              AmericaSMM (americasmm.in) provides automated social media marketing distribution, reseller API v2 solutions, and wholesale engagement infrastructure for digital creators, marketing agencies, and global panels.
            </p>
            <div className="pt-1 flex items-center gap-2 text-slate-300 font-mono text-[11px]">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <a href="mailto:support@americasmm.in" className="hover:text-blue-400 transition-colors">
                support@americasmm.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-200 mb-3">Navigation</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Order Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('api')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reseller API v2
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('add-funds')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Deposit Funds
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Platforms */}
          <div className="md:col-span-2 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-200 mb-3">Platforms</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>Instagram Marketing</li>
              <li>TikTok FYP Growth</li>
              <li>YouTube Watch Time</li>
              <li>Telegram Members</li>
              <li>Twitter / X Engagement</li>
              <li>Spotify Royalties</li>
              <li>Discord Members</li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-200 mb-3">Support & Policies</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSupportModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Open Support Ticket
                </button>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service & SLA</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy & Data Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Refund & Refill Guarantee</span>
              </li>
            </ul>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} AmericaSMM (americasmm.in). All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-xl">
            Disclaimer: AmericaSMM is an independent promotional optimizer not affiliated with Meta Platforms, Instagram, TikTok, ByteDance, YouTube, Google LLC, or X Corp.
          </div>
        </div>
      </div>
    </footer>
  );
};
