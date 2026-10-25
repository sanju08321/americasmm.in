import React, { useState } from 'react';
import { useSMM } from '../context/SMMContext';
import { Copy, Check, Terminal, Play, Key, Code2 } from 'lucide-react';

export const ApiDocs: React.FC = () => {
  const { user, services, orders } = useSMM();
  const [activeLang, setActiveLang] = useState<'curl' | 'nodejs' | 'python' | 'php'>('curl');
  const [sandboxAction, setSandboxAction] = useState<'services' | 'add' | 'status' | 'balance'>('balance');
  const [sandboxResponse, setSandboxResponse] = useState<string | null>(null);
  const [executing, setExecuting] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const executeSandbox = () => {
    setExecuting(true);
    setTimeout(() => {
      let resData: any = {};

      if (sandboxAction === 'balance') {
        resData = {
          balance: user.balance.toFixed(2),
          currency: 'USD'
        };
      } else if (sandboxAction === 'services') {
        resData = services.slice(0, 3).map((s) => ({
          service: s.id,
          name: s.name,
          type: 'Default',
          category: s.category,
          rate: s.ratePer1k.toFixed(4),
          min: s.min,
          max: s.max,
          refill: s.refillDays !== 'No Refill'
        }));
      } else if (sandboxAction === 'status') {
        const firstOrder = orders[0];
        resData = {
          charge: firstOrder ? firstOrder.charge.toFixed(4) : '0.82',
          start_count: firstOrder ? firstOrder.startCount.toString() : '1420',
          status: firstOrder ? firstOrder.status : 'In progress',
          remains: firstOrder ? firstOrder.remains.toString() : '500',
          currency: 'USD'
        };
      } else if (sandboxAction === 'add') {
        resData = {
          order: Math.floor(10000 + Math.random() * 90000)
        };
      }

      setSandboxResponse(JSON.stringify(resData, null, 2));
      setExecuting(false);
    }, 350);
  };

  const getCodeSnippet = () => {
    switch (activeLang) {
      case 'curl':
        return `# Check Account Balance
curl -X POST https://americasmm.in/api/v2 \\
  -d "key=${user.apiKey}" \\
  -d "action=balance"

# Place an Order
curl -X POST https://americasmm.in/api/v2 \\
  -d "key=${user.apiKey}" \\
  -d "action=add" \\
  -d "service=101" \\
  -d "link=https://instagram.com/my_profile" \\
  -d "quantity=1000"`;

      case 'nodejs':
        return `// Node.js (Fetch API)
const response = await fetch('https://americasmm.in/api/v2', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    key: '${user.apiKey}',
    action: 'add',
    service: '101',
    link: 'https://instagram.com/my_profile',
    quantity: '1000'
  })
});
const data = await response.json();
console.log('Order Response:', data);`;

      case 'python':
        return `# Python 3 (Requests)
import requests

url = "https://americasmm.in/api/v2"
payload = {
    "key": "${user.apiKey}",
    "action": "add",
    "service": 101,
    "link": "https://instagram.com/my_profile",
    "quantity": 1000
}

res = requests.post(url, data=payload)
print(res.json())`;

      case 'php':
        return `<?php
// PHP cURL Example
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://americasmm.in/api/v2');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'key' => '${user.apiKey}',
    'action' => 'status',
    'order' => '89412'
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);
print_r($response);`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="api-docs" className="py-12 bg-slate-900/60 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
            04. Developer Integration
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Reseller API v2 Documentation
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Connect your own SMM panel or custom application to AmericaSMM via our high-speed JSON REST API.
          </p>
        </div>

        {/* API Key Banner */}
        <div className="mb-8 p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-950/60 border border-blue-800/60 rounded-lg text-blue-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-slate-400">Your Reseller API Key</div>
              <div className="font-mono text-sm font-semibold text-white tracking-wider">
                {user.apiKey}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyKey}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey ? 'Copied' : 'Copy API Key'}</span>
            </button>
          </div>
        </div>

        {/* API Grid: Specs & Code on Left, Sandbox on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Code Snippets & Endpoints */}
          <div className="lg:col-span-7 space-y-6">
            {/* Base Endpoint */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-xs font-mono text-slate-400 uppercase mb-1">API Endpoint (POST)</div>
              <div className="font-mono text-sm font-semibold text-blue-400 bg-slate-900 px-3 py-2 rounded border border-slate-800 select-all">
                https://americasmm.in/api/v2
              </div>
            </div>

            {/* Code Selector */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-1">
                  {(['curl', 'nodejs', 'python', 'php'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-3 py-1 text-xs font-mono uppercase rounded transition-colors cursor-pointer ${
                        activeLang === lang
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-950 overflow-x-auto">
                <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                  {getCodeSnippet()}
                </pre>
              </div>
            </div>

            {/* Parameters Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400">Supported Actions</div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex items-start gap-2">
                  <code className="text-blue-400 font-mono shrink-0">action=services</code>
                  <span className="text-slate-300">Returns list of all available services, current rates, and min/max limits.</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex items-start gap-2">
                  <code className="text-blue-400 font-mono shrink-0">action=add</code>
                  <span className="text-slate-300">Creates a new order. Required fields: <code className="text-slate-400">service</code>, <code className="text-slate-400">link</code>, <code className="text-slate-400">quantity</code>.</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex items-start gap-2">
                  <code className="text-blue-400 font-mono shrink-0">action=status</code>
                  <span className="text-slate-300">Inspect status, start count, and remaining count for a given <code className="text-slate-400">order</code> ID.</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex items-start gap-2">
                  <code className="text-blue-400 font-mono shrink-0">action=balance</code>
                  <span className="text-slate-300">Returns current available account wallet balance and currency code.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive API Sandbox */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-mono text-blue-400 uppercase">Live API Sandbox</span>
                <span className="text-xs font-mono text-slate-400">Response: 200 OK</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Select Test Action
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['balance', 'services', 'status', 'add'] as const).map((act) => (
                      <button
                        key={act}
                        type="button"
                        onClick={() => {
                          setSandboxAction(act);
                          setSandboxResponse(null);
                        }}
                        className={`px-3 py-2 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                          sandboxAction === act
                            ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        action={act}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={executeSandbox}
                  disabled={executing}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{executing ? 'Executing Request...' : 'Send Test Request'}</span>
                </button>

                {/* Sandbox Response Output */}
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                    Simulated Response Payload:
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 min-h-[160px] overflow-auto">
                    {sandboxResponse ? (
                      <pre>{sandboxResponse}</pre>
                    ) : (
                      <span className="text-slate-500">Click "Send Test Request" to simulate live response payload...</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Rate Limit: 100 requests/sec</span>
              <span className="font-mono text-slate-500">HTTP/2 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
