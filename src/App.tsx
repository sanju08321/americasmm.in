import React, { useState } from 'react';
import { SMMProvider, useSMM } from './context/SMMContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesCatalog } from './components/ServicesCatalog';
import { OrderConsole } from './components/OrderConsole';
import { OrderTracker } from './components/OrderTracker';
import { ApiDocs } from './components/ApiDocs';
import { PaymentGateways } from './components/PaymentGateways';
import { FeaturesBento } from './components/FeaturesBento';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { AuthModal } from './components/modals/AuthModal';
import { AddFundsModal } from './components/modals/AddFundsModal';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { SupportTicketModal } from './components/modals/SupportTicketModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('services');
  const [recentOrderId, setRecentOrderId] = useState<string | undefined>(undefined);
  const { toast, setPrefillServiceId } = useSMM();

  const handleOrderRedirect = (serviceId: number) => {
    setPrefillServiceId(serviceId);
    setActiveTab('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSubmitted = (orderId: string) => {
    setRecentOrderId(orderId);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm">
          <div
            className={`p-4 rounded-xl border shadow-2xl flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-800 text-rose-200'
                : toast.type === 'info'
                ? 'bg-blue-950/90 border-blue-800 text-blue-200'
                : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs font-medium leading-relaxed">{toast.text}</div>
          </div>
        </div>
      )}

      {/* Top Bar following Top Bar Contract */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Routing */}
      <main className="flex-1">
        {activeTab === 'services' && (
          <>
            <HeroSection onNavigate={setActiveTab} />
            <ServicesCatalog onSelectOrder={handleOrderRedirect} />
            <FeaturesBento />
            <PaymentGateways />
            <TestimonialsFaq />
          </>
        )}

        {activeTab === 'order' && (
          <div className="py-6">
            <OrderConsole onOrderSuccess={handleOrderSubmitted} />
            <div className="mt-8">
              <ServicesCatalog onSelectOrder={handleOrderRedirect} />
            </div>
          </div>
        )}

        {activeTab === 'track' && (
          <div className="py-6">
            <OrderTracker highlightOrderId={recentOrderId} />
            <div className="mt-8">
              <PaymentGateways />
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="py-6">
            <ApiDocs />
          </div>
        )}

        {activeTab === 'add-funds' && (
          <div className="py-6">
            <PaymentGateways />
            <div className="mt-8">
              <FeaturesBento />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Interactive Modals */}
      <AuthModal />
      <AddFundsModal />
      <ServiceDetailModal onOrderNow={handleOrderRedirect} />
      <SupportTicketModal />
    </div>
  );
};

export default function App() {
  return (
    <SMMProvider>
      <MainContent />
    </SMMProvider>
  );
}
