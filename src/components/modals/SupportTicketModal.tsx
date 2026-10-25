import React, { useState } from 'react';
import { useSMM } from '../../context/SMMContext';
import { X, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { SupportTicket } from '../../types/smm';

export const SupportTicketModal: React.FC = () => {
  const { supportModalOpen, setSupportModalOpen, submitTicket } = useSMM();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('Refill Request');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [ticketCreated, setTicketCreated] = useState<string | null>(null);

  if (!supportModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    const id = submitTicket(subject, category, message, orderId || undefined);
    setTicketCreated(id);
  };

  const handleClose = () => {
    setSupportModalOpen(false);
    setTicketCreated(null);
    setSubject('');
    setMessage('');
    setOrderId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
            24/7 Operations Help Desk
          </div>
          <h3 className="text-xl font-bold text-white">Create Support Ticket</h3>
          <p className="text-xs text-slate-400 mt-1">
            AmericaSMM engineers respond within 15 minutes around the clock.
          </p>
        </div>

        {ticketCreated ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Ticket Submitted!</h4>
            <div className="font-mono text-sm text-blue-400 font-semibold">
              Ticket ID: #{ticketCreated}
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Our support team has received your inquiry. Updates will be sent to your registered email and reflected in your dashboard.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-4 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SupportTicket['category'])}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Refill Request">Refill Request</option>
                <option value="Order Issue">Order Issue (Speed / Start / Drop)</option>
                <option value="Payment / Deposit">Payment / Deposit Assistance</option>
                <option value="API Integration">API v2 Integration / Reseller Key</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Related Order ID (Optional)
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. AS-89412"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your question or issue"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Message / Details
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue with as much detail as possible..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
