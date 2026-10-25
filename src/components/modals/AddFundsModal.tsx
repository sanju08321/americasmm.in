import React, { useState } from 'react';
import { useSMM } from '../../context/SMMContext';
import { X, CreditCard, Bitcoin, Wallet, DollarSign, Tag, CheckCircle2 } from 'lucide-react';

export const AddFundsModal: React.FC = () => {
  const {
    addFundsModalOpen,
    setAddFundsModalOpen,
    addFunds,
    formatPrice,
    currencyConfig,
    convertPrice
  } = useSMM();

  const [selectedGateway, setSelectedGateway] = useState('Cards (Stripe)');
  const [amountUSD, setAmountUSD] = useState<number>(50);
  const [promoCode, setPromoCode] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!addFundsModalOpen) return null;

  const gateways = [
    { id: 'Cards (Stripe)', label: 'Cards (Visa, MC, Amex)', icon: CreditCard, fee: '0%' },
    { id: 'Crypto USDT (TRC20)', label: 'Crypto (USDT / BTC)', icon: Bitcoin, fee: '0%' },
    { id: 'PayPal', label: 'PayPal & Venmo', icon: Wallet, fee: '0%' },
    { id: 'Cash App', label: 'Cash App & Apple Pay', icon: DollarSign, fee: '0%' },
    { id: 'UPI / NetBanking', label: 'UPI & Instant Banking', icon: CreditCard, fee: '0%' }
  ];

  const presets = [20, 50, 100, 250];

  const bonusMultiplier = promoCode.trim().toUpperCase() === 'AMERICA10' ? 0.10 : 0;
  const bonusUSD = amountUSD * bonusMultiplier;
  const totalCreditUSD = amountUSD + bonusUSD;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      addFunds(amountUSD, selectedGateway, promoCode);
      setProcessing(false);
      setAddFundsModalOpen(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
        <button
          type="button"
          onClick={() => setAddFundsModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
            AmericaSMM Treasury
          </div>
          <h3 className="text-xl font-bold text-white">Deposit Balance</h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose a payment method and enter an amount to credit your account immediately.
          </p>
        </div>

        <form onSubmit={handleDeposit} className="space-y-4">
          {/* Gateway Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Select Payment Gateway
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {gateways.map((gw) => {
                const Icon = gw.icon;
                const isSelected = selectedGateway === gw.id;
                return (
                  <button
                    key={gw.id}
                    type="button"
                    onClick={() => setSelectedGateway(gw.id)}
                    className={`p-3 text-left rounded-lg border text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="truncate">
                      <div>{gw.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Fee: {gw.fee}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Input & Presets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-slate-400">
                Deposit Amount ($ USD)
              </label>
              <span className="text-xs font-mono text-slate-400">
                ≈ {formatPrice(amountUSD)} in {currencyConfig.code}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                $
              </span>
              <input
                type="number"
                min={5}
                max={5000}
                value={amountUSD}
                onChange={(e) => setAmountUSD(Math.max(5, parseFloat(e.target.value) || 5))}
                className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Quick preset buttons */}
            <div className="flex items-center gap-2 mt-2">
              {presets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountUSD(amt)}
                  className={`px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                    amountUSD === amt
                      ? 'bg-blue-600 text-white border-blue-500 font-medium'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Promo Code Input */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Promo Coupon (Use: <span className="text-blue-400 font-bold">AMERICA10</span> for +10%)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="AMERICA10"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 font-mono uppercase focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span>Base Deposit</span>
              <span className="font-mono text-white">{formatPrice(amountUSD)}</span>
            </div>
            {bonusUSD > 0 && (
              <div className="flex items-center justify-between text-emerald-400">
                <span>Bonus Promo (10%)</span>
                <span className="font-mono">+{formatPrice(bonusUSD)}</span>
              </div>
            )}
            <div className="pt-1.5 border-t border-slate-900 flex items-center justify-between font-semibold text-white">
              <span>Total Credited Balance</span>
              <span className="font-mono text-emerald-400 text-sm">{formatPrice(totalCreditUSD)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {processing ? 'Processing Gateway...' : `Complete ${formatPrice(amountUSD)} Deposit`}
          </button>
        </form>
      </div>
    </div>
  );
};
