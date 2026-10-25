import React, { useState } from 'react';
import { useSMM } from '../context/SMMContext';
import { ChevronDown, MessageSquare, ShieldCheck, Star } from 'lucide-react';

export const TestimonialsFaq: React.FC = () => {
  const { setSupportModalOpen } = useSMM();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Growth Lead',
      company: 'Apex Media Agency (Miami, FL)',
      content:
        'We manage over 60 client Instagram and TikTok creator profiles. AmericaSMM has been our primary provider for 8 months. Order delivery starts within 90 seconds and the 365-day refill warranty works flawlessly.',
      metric: 'Over 420K monthly interactions delivered'
    },
    {
      name: 'Elena Rostova',
      role: 'Founder & Reseller',
      company: 'ViralWave Marketing (Austin, TX)',
      content:
        'Migrated our reseller panel from generic middleman panels to AmericaSMM. The API v2 is stable, returns clean JSON payloads, and their server latency is under 50ms. Profit margins improved by 34%.',
      metric: 'Integrated with 14,000 active API sub-orders'
    },
    {
      name: 'Rohan Sharma',
      role: 'Independent Digital Strategist',
      company: 'StreamPulse Media',
      content:
        'The YouTube watch time and high-retention suggested video views helped three client channels cross monetization review without drops. Support responds within minutes.',
      metric: '100% Monetization approval on 3 channels'
    }
  ];

  const faqs = [
    {
      q: 'What is AmericaSMM (americasmm.in)?',
      a: 'AmericaSMM is a premier wholesale Social Media Marketing (SMM) provider platform. We supply automated engagement services including followers, likes, high-retention video views, watch time, and channel members across Instagram, TikTok, YouTube, Telegram, and X.'
    },
    {
      q: 'How fast do orders start and complete?',
      a: 'Most services start automatically within 1 to 15 minutes after order placement. Speed rates (e.g. 50K/Day or 1M/Day) are detailed on each service description. High retention services (like YouTube Watch Time or Organic Subscribers) are paced naturally to comply with platform safety.'
    },
    {
      q: 'What does the Refill Guarantee mean?',
      a: 'If any service marked with a refill guarantee drops below the ordered count during the warranty window (e.g. 30 days or 365 days), you can click the "Refill" button in your Order Tracking panel or trigger it via API. Our server automatically inspects the count and restores it free of charge.'
    },
    {
      q: 'Can I resell AmericaSMM services on my own website?',
      a: 'Yes. AmericaSMM fully supports SMM panel software (including PerfectPanel, SmartPanel, RentASMM, and custom codebases). Simply copy your Reseller API Key from the API Docs tab and point your panel to https://americasmm.in/api/v2.'
    },
    {
      q: 'Is it safe for my social media accounts?',
      a: 'Yes. We deliver services using high-quality accounts and realistic delivery pacing that emulate natural viral growth. We never ask for your account password—only your public URL or username is required.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Credit/Debit Cards (Visa, MasterCard, American Express), Cryptocurrencies (USDT TRC20, Bitcoin, Ethereum, Solana), PayPal, Cash App, Apple Pay, and instant UPI transfers for Indian and international clients.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
            07. Verified Proof
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Client & Agency Outcomes
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Real feedback from agency operators and digital marketing consultants scaling with AmericaSMM.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between shadow-lg"
            >
              <div>
                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role} · {t.company}</div>
                <div className="mt-2 text-[11px] font-mono text-blue-400">{t.metric}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
              08. Common Inquiries
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Need technical clarification or have questions regarding balance deposits, API limits, or refill policies?
            </p>

            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
              <div className="text-sm font-semibold text-white">Have a specific question?</div>
              <p className="text-xs text-slate-400">
                Our support team operates 24/7 with average ticket resolution under 15 minutes.
              </p>
              <button
                type="button"
                onClick={() => setSupportModalOpen(true)}
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Support Ticket</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
