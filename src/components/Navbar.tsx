import React, { useState } from 'react';
import { useSMM, CURRENCY_CONFIGS } from '../context/SMMContext';
import { CurrencyCode } from '../types/smm';
import { Wallet, Globe, User, PlusCircle, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    currency,
    setCurrency,
    formatPrice,
    user,
    setAddFundsModalOpen,
    setAuthModalOpen,
    isLoggedIn
  } = useSMM();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'order', label: 'New Order' },
    { id: 'track', label: 'Track Orders' },
    { id: 'api', label: 'API v2' },
    { id: 'add-funds', label: 'Add Funds' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <button
            onClick={() => handleNavClick('services')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
                America<span className="text-blue-500">SMM</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 uppercase tracking-wider bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                americasmm.in
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 Clean Single-Line Text Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-white cursor-pointer ${
                    isActive ? 'text-blue-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Currency Switcher & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Switch Currency"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-white">{currency}</span>
              </button>

              {currencyDropdown && (
                <div
                  className="absolute right-0 mt-2 w-44 rounded-lg bg-slate-900 border border-slate-800 shadow-xl py-1 z-50 text-xs"
                  onMouseLeave={() => setCurrencyDropdown(false)}
                >
                  {(Object.keys(CURRENCY_CONFIGS) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => {
                        setCurrency(cCode);
                        setCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        currency === cCode ? 'text-blue-400 font-medium bg-slate-800/50' : 'text-slate-300'
                      }`}
                    >
                      <span>{CURRENCY_CONFIGS[cCode].name}</span>
                      <span className="font-mono text-slate-400">{CURRENCY_CONFIGS[cCode].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wallet Balance & Add Funds CTA */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAddFundsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-lg transition-all cursor-pointer"
                  title="Click to Add Funds"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span className="font-mono font-semibold tabular-nums">
                    {formatPrice(user.balance)}
                  </span>
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-400/80" />
                </button>

                <button
                  onClick={() => handleNavClick('order')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm hover:shadow-blue-600/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>New Order</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                activeTab === link.id
                  ? 'bg-blue-900/40 text-blue-400 font-medium'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
            <span>User: {user.username}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAddFundsModalOpen(true);
              }}
              className="text-blue-400 font-medium hover:underline"
            >
              Deposit Funds
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
