import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CurrencyCode,
  CurrencyConfig,
  PlatformCategory,
  SMMService,
  SMMOrder,
  SupportTicket,
  UserProfile
} from '../types/smm';
import { SMM_SERVICES, INITIAL_ORDERS } from '../data/servicesData';

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar (USD)' },
  INR: { code: 'INR', symbol: '₹', rate: 86.5, name: 'Indian Rupee (INR)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro (EUR)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, name: 'British Pound (GBP)' },
};

interface SMMContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencyConfig: CurrencyConfig;
  formatPrice: (usdAmount: number, decimalPlaces?: number) => string;
  convertPrice: (usdAmount: number) => number;
  
  services: SMMService[];
  orders: SMMOrder[];
  user: UserProfile;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  
  placeOrder: (serviceId: number, link: string, quantity: number) => { success: boolean; message: string; orderId?: string };
  placeMassOrder: (rawText: string) => { success: boolean; placedCount: number; errors: string[] };
  requestRefill: (orderId: string) => { success: boolean; message: string };
  addFunds: (amountUSD: number, gateway: string, promoCode?: string) => { success: boolean; bonus: number; finalCredit: number };
  submitTicket: (subject: string, category: SupportTicket['category'], message: string, orderId?: string) => string;
  
  // Modals & Navigation
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  addFundsModalOpen: boolean;
  setAddFundsModalOpen: (open: boolean) => void;
  selectedServiceModal: SMMService | null;
  setSelectedServiceModal: (service: SMMService | null) => void;
  supportModalOpen: boolean;
  setSupportModalOpen: (open: boolean) => void;
  
  // Quick prefill for Order Console
  prefillServiceId: number | null;
  setPrefillServiceId: (id: number | null) => void;
  
  // Notifications
  toast: { text: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const SMMContext = createContext<SMMContextType | undefined>(undefined);

export const SMMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [services] = useState<SMMService[]>(SMM_SERVICES);
  const [orders, setOrders] = useState<SMMOrder[]>(INITIAL_ORDERS);
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>({
    username: 'growth_agency_us',
    email: 'operations@americasmm.in',
    balance: 42.50,
    totalSpent: 384.20,
    apiKey: 'asmm_live_891f7a24c5b903e1a74d28',
    role: 'VIP Client'
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [addFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [selectedServiceModal, setSelectedServiceModal] = useState<SMMService | null>(null);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [prefillServiceId, setPrefillServiceId] = useState<number | null>(null);
  
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TICK-4192',
      subject: 'Refill verification for Order #AS-89412',
      category: 'Refill Request',
      orderId: 'AS-89412',
      message: 'Can you please check the 365 days auto-refill for this order?',
      status: 'Answered',
      createdAt: 'Yesterday'
    }
  ]);

  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ text, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const currencyConfig = CURRENCY_CONFIGS[currency];

  const convertPrice = (usdAmount: number): number => {
    return Number((usdAmount * currencyConfig.rate).toFixed(4));
  };

  const formatPrice = (usdAmount: number, decimalPlaces?: number): string => {
    const converted = usdAmount * currencyConfig.rate;
    const decimals = decimalPlaces !== undefined 
      ? decimalPlaces 
      : converted < 0.05 
        ? 4 
        : converted < 1 
          ? 3 
          : 2;
    return `${currencyConfig.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}`;
  };

  const placeOrder = (serviceId: number, link: string, quantity: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) {
      return { success: false, message: 'Invalid service selected.' };
    }

    if (!link || link.trim().length === 0) {
      return { success: false, message: 'Please provide a valid target URL or username.' };
    }

    if (quantity < service.min || quantity > service.max) {
      return {
        success: false,
        message: `Quantity must be between ${service.min.toLocaleString()} and ${service.max.toLocaleString()}.`
      };
    }

    const totalCost = Number(((service.ratePer1k / 1000) * quantity).toFixed(4));

    if (user.balance < totalCost) {
      setAddFundsModalOpen(true);
      return {
        success: false,
        message: `Insufficient balance (${formatPrice(user.balance)}). Needed: ${formatPrice(totalCost)}. Please add funds.`
      };
    }

    const newOrderId = `AS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: SMMOrder = {
      orderId: newOrderId,
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      link: link.trim(),
      quantity,
      charge: totalCost,
      status: 'In Progress',
      startCount: Math.floor(Math.random() * 1500) + 100,
      remains: quantity,
      createdAt: 'Just now',
      refillEligible: service.refillDays !== 'No Refill'
    };

    setUser((prev) => ({
      ...prev,
      balance: Number((prev.balance - totalCost).toFixed(4)),
      totalSpent: Number((prev.totalSpent + totalCost).toFixed(4))
    }));

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Order #${newOrderId} placed successfully! Processing has started.`);

    return {
      success: true,
      message: `Order #${newOrderId} successfully queued.`,
      orderId: newOrderId
    };
  };

  const placeMassOrder = (rawText: string) => {
    const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      return { success: false, placedCount: 0, errors: ['Please enter mass order lines.'] };
    }

    const errors: string[] = [];
    let placedCount = 0;
    let accumulatedCost = 0;
    const newOrdersList: SMMOrder[] = [];

    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split('|').map((p) => p.trim());
      if (parts.length < 3) {
        errors.push(`Line ${i + 1}: Format must be 'service_id | link | quantity'`);
        continue;
      }

      const sId = parseInt(parts[0], 10);
      const link = parts[1];
      const qty = parseInt(parts[2], 10);

      const service = services.find((s) => s.id === sId);
      if (!service) {
        errors.push(`Line ${i + 1}: Service ID #${sId} not found.`);
        continue;
      }

      if (!link) {
        errors.push(`Line ${i + 1}: Missing target link.`);
        continue;
      }

      if (isNaN(qty) || qty < service.min || qty > service.max) {
        errors.push(`Line ${i + 1}: Quantity ${qty} out of range [${service.min} - ${service.max}] for #${sId}.`);
        continue;
      }

      const cost = Number(((service.ratePer1k / 1000) * qty).toFixed(4));
      accumulatedCost += cost;

      const orderId = `AS-${Math.floor(10000 + Math.random() * 90000)}`;
      newOrdersList.push({
        orderId,
        serviceId: service.id,
        serviceName: service.name,
        category: service.category,
        link,
        quantity: qty,
        charge: cost,
        status: 'In Progress',
        startCount: 0,
        remains: qty,
        createdAt: 'Just now',
        refillEligible: service.refillDays !== 'No Refill'
      });
      placedCount++;
    }

    if (placedCount === 0) {
      return { success: false, placedCount: 0, errors };
    }

    if (user.balance < accumulatedCost) {
      setAddFundsModalOpen(true);
      return {
        success: false,
        placedCount: 0,
        errors: [`Insufficient balance for ${placedCount} orders. Total: ${formatPrice(accumulatedCost)}, Available: ${formatPrice(user.balance)}`]
      };
    }

    setUser((prev) => ({
      ...prev,
      balance: Number((prev.balance - accumulatedCost).toFixed(4)),
      totalSpent: Number((prev.totalSpent + accumulatedCost).toFixed(4))
    }));

    setOrders((prev) => [...newOrdersList, ...prev]);
    showToast(`Bulk orders placed! ${placedCount} orders queued successfully.`);

    return { success: true, placedCount, errors };
  };

  const requestRefill = (orderId: string) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return { success: false, message: 'Order not found.' };

    if (!order.refillEligible) {
      return { success: false, message: 'This service tier does not include auto-refill warranty.' };
    }

    showToast(`Refill request submitted for #${orderId}. Auto-replenishment initiated.`);
    return { success: true, message: `Refill queued for Order #${orderId}` };
  };

  const addFunds = (amountUSD: number, gateway: string, promoCode?: string) => {
    let bonusRate = 0;
    if (promoCode && promoCode.trim().toUpperCase() === 'AMERICA10') {
      bonusRate = 0.10; // 10% bonus
    } else if (promoCode && promoCode.trim().toUpperCase() === 'VIP5') {
      bonusRate = 0.05;
    }

    const bonus = Number((amountUSD * bonusRate).toFixed(2));
    const finalCredit = Number((amountUSD + bonus).toFixed(2));

    setUser((prev) => ({
      ...prev,
      balance: Number((prev.balance + finalCredit).toFixed(2))
    }));

    showToast(`Successfully deposited ${formatPrice(amountUSD)} via ${gateway}${bonus > 0 ? ` + ${formatPrice(bonus)} bonus!` : '!'}`);
    return { success: true, bonus, finalCredit };
  };

  const submitTicket = (
    subject: string,
    category: SupportTicket['category'],
    message: string,
    orderId?: string
  ) => {
    const ticketId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      id: ticketId,
      subject,
      category,
      orderId,
      message,
      status: 'Open',
      createdAt: 'Just now'
    };

    setTickets((prev) => [newTicket, ...prev]);
    showToast(`Support ticket ${ticketId} created. Response expected within 15 minutes.`);
    return ticketId;
  };

  return (
    <SMMContext.Provider
      value={{
        currency,
        setCurrency,
        currencyConfig,
        formatPrice,
        convertPrice,
        services,
        orders,
        user,
        isLoggedIn,
        setIsLoggedIn,
        placeOrder,
        placeMassOrder,
        requestRefill,
        addFunds,
        submitTicket,
        authModalOpen,
        setAuthModalOpen,
        addFundsModalOpen,
        setAddFundsModalOpen,
        selectedServiceModal,
        setSelectedServiceModal,
        supportModalOpen,
        setSupportModalOpen,
        prefillServiceId,
        setPrefillServiceId,
        toast,
        showToast
      }}
    >
      {children}
    </SMMContext.Provider>
  );
};

export const useSMM = () => {
  const ctx = useContext(SMMContext);
  if (!ctx) {
    throw new Error('useSMM must be used within an SMMProvider');
  }
  return ctx;
};
