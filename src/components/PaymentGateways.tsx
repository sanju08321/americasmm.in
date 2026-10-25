import React, { useState } from 'react';
import { useSMM } from '../context/SMMContext';
import { CreditCard, Bitcoin, DollarSign, Wallet, Shield, CheckCircle2 } from 'lucide-react';

export const PaymentGateways: React.FC = () => {
  const { formatPrice, currency, setAddFundsModalOpen } = useSMM();

  const methods = [
    {
      name: 'Credit & Debit Cards',
      providers: 'Visa, Mastercard, Amex, Discover',
      badge: 'Instant Delivery',
      minDeposit: 10,
      fee: '0% Fee'
    },
    {
      name: 'Cryptocurrency',
      providers: 'USDT (TRC20), BTC, ETH, SOL',
      badge: '+5% Extra Bonus on $100+',
      minDeposit: 10,
      fee: '0% Fee'
    },
    {
      name: 'PayPal & Venmo',
      providers: 'Direct balance & linked accounts',
      badge: 'Verified Gateways',
      minDeposit: 15,
      fee: '0% Fee'
    },
    {
      name: 'Cash App & Apple Pay',
      providers: 'Fast mobile checkout',
      badge: 'Instant Processing',
      minDeposit: 10,
      fee: '0% Fee'
    },
    {
      name: 'UPI & NetBanking',
      providers: 'PayTM, PhonePe, Google Pay, UPI ID',
      badge: 'Instant Indian Banking',
      minDeposit: 5,
      fee: '0% Fee'
    },
    {
      name: 'Wire & Wise Transfer',
      providers: 'ACH, SEPA, Swift International',
      badge: 'Wholesale & Resellers',
      minDeposit: 100,
      fee: '0% Fee'
    }
  ];

  return (
    <section id="payment-gateways" className="py-12 bg-slate-900/40 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
              06. Treasury & Deposits
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Instant Payment Methods
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Deposit funds via global automated payment gateways with zero transaction fees and instant balance allocation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAddFundsModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            Deposit Balance Now
          </button>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map((method) => (
            <div
              key={method.name}
              className="p-5 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-[11px] text-blue-400">{method.badge}</span>
                  <span className="font-mono text-emerald-400">{method.fee}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {method.name}
                </h3>
                <div className="text-xs text-slate-400 mb-4">
                  {method.providers}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Min: <span className="font-mono text-slate-200">{formatPrice(method.minDeposit)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setAddFundsModalOpen(true)}
                  className="text-blue-400 hover:text-white font-medium hover:underline cursor-pointer"
                >
                  Add Funds &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
