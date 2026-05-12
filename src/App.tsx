/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2,
  RefreshCw,
  Landmark,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SAVING_TIPS = [
  "Switch to generic brands for your grocery staples to save up to 25% on your food bill.",
  "Check your recurring subscriptions—cancel anything you haven't used in the last 30 days.",
  "Try the 'Wait 24 Hours' rule before making any non-essential purchase.",
  "Pack your own lunch for work instead of eating out; you'll save roughly $150 a month.",
  "Unsubscribe from marketing emails to reduce the temptation of flash sales.",
  "Save energy by unplugging electronics when they're not in use.",
  "Use a cashback app or credit card for essentials you already buy.",
  "Set up an automatic recurring transfer to your savings account on payday.",
  "Review your insurance policies annually to ensure you're getting the best rate.",
  "Look for free community events instead of expensive entertainment options.",
  "Plan your meals for the week to avoid last-minute takeout orders.",
  "Shop for seasonal produce—it's cheaper and tastes better.",
  "Wait for major sales holidays before buying big-ticket electronics.",
  "Try 'No-Spend Weekends' once a month to boost your savings rate.",
  "Walk or bike for short trips instead of driving to save on fuel and parking."
];

export default function App() {
  const [income, setIncome] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [results, setResults] = useState<{
    balance: number;
    percent: number;
    tips: string[];
    show: boolean;
  }>({
    balance: 0,
    percent: 0,
    tips: [],
    show: false
  });

  const calculate = () => {
    const inc = parseFloat(income) || 0;
    const exp = parseFloat(expenses) || 0;
    
    if (inc <= 0) return;

    const balance = inc - exp;
    const percent = (balance / inc) * 100;
    
    // Pick 3 random unique tips
    const shuffled = [...SAVING_TIPS].sort(() => 0.5 - Math.random());
    const selectedTips = shuffled.slice(0, 3);

    setResults({
      balance,
      percent,
      tips: selectedTips,
      show: true
    });
  };

  const isLowSavings = results.percent < 20;

  return (
    <div className="flex flex-col h-screen min-w-[1024px] overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
        <div className="flex items-center gap-3 font-bold text-xl text-brand-700">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-lg">
            $
          </div>
          MintFinance Pro
        </div>
        <div className="text-[13px] text-slate-400 font-medium">
          Professional Financial Control v2.4
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-[380px_1fr] gap-6 p-6 overflow-hidden">
        {/* Left Column: Calculator */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5 overflow-y-auto shadow-sm">
          <div>
            <h2 className="text-lg font-bold mb-2">Quick Calculator</h2>
            <p className="text-sm text-slate-600">
              Calculate your monthly cash flow and get instant optimization tips.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="income" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Monthly Gross Income
              </label>
              <div className="relative">
                <input
                  id="income"
                  type="number"
                  placeholder="e.g. 5000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="h-12 w-full px-4 bg-white border border-slate-200 rounded-lg text-base focus:border-brand-600 focus:ring-0 outline-hidden transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="expenses" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Total Monthly Expenses
              </label>
              <div className="relative">
                <input
                  id="expenses"
                  type="number"
                  placeholder="e.g. 3500"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="h-12 w-full px-4 bg-white border border-slate-200 rounded-lg text-base focus:border-brand-600 focus:ring-0 outline-hidden transition-colors"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              disabled={!income}
              className="h-12 w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base rounded-lg cursor-pointer transition-colors active:scale-[0.98] mt-2"
            >
              Calculate Balance
            </button>
          </div>

          {/* Benchmarks */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-4">
              Popular Benchmarks
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[13px] font-medium">
                <span>Needs (50%)</span>
                <span className="text-slate-400">${(parseFloat(income) ? (parseFloat(income) * 0.5).toLocaleString() : '0')}</span>
              </div>
              <div className="flex justify-between text-[13px] font-medium">
                <span>Wants (30%)</span>
                <span className="text-slate-400">${(parseFloat(income) ? (parseFloat(income) * 0.3).toLocaleString() : '0')}</span>
              </div>
              <div className="flex justify-between text-[13px] font-medium">
                <span>Savings (20%)</span>
                <span className="text-slate-400">${(parseFloat(income) ? (parseFloat(income) * 0.2).toLocaleString() : '0')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-6 overflow-hidden shadow-sm">
          <AnimatePresence mode="wait">
            {!results.show ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex-1 flex flex-col items-center justify-center text-center text-slate-400"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Wallet size={32} />
                </div>
                <p className="font-medium">Enter your details and click calculate<br />to see your financial analysis.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col gap-6 overflow-hidden"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-brand-50 border border-brand-100 rounded-lg">
                    <div className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">Remaining Balance</div>
                    <div className="text-2xl font-bold mt-1 text-slate-800">
                      ${results.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="p-4 bg-brand-50 border border-brand-100 rounded-lg">
                    <div className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">Savings Rate</div>
                    <div className="text-2xl font-bold mt-1 text-slate-800">
                      {Math.max(0, Math.round(results.percent))}%
                    </div>
                  </div>
                </div>

                {/* Utilization Area */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Budget Utilization</span>
                    <span className="text-xs font-bold text-slate-800">{Math.round(100 - results.percent)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(0, 100 - results.percent))}%` }}
                      className={`h-full transition-colors ${isLowSavings ? 'bg-rose-500' : 'bg-brand-600'}`}
                    />
                  </div>
                  
                  {isLowSavings && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mt-4 p-4 bg-rose-50 border-l-4 border-rose-600 text-rose-600 text-[14px] font-bold"
                    >
                      Warning! Your expenses are too high. Consider reducing discretionary spending.
                    </motion.div>
                  )}
                </div>

                {/* Tips Section */}
                <div className="flex-1 border-t border-slate-100 pt-6 flex flex-col overflow-hidden">
                  <div className="flex items-center gap-2 text-sm font-bold mb-4">
                    <div className="text-brand-600 text-lg">✦</div>
                    Smart Financial Tips
                  </div>
                  <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {results.tips.map((tip, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={tip}
                        className="text-[13px] text-slate-600 flex gap-3 group leading-relaxed"
                      >
                        <span className="text-brand-600 font-bold shrink-0 mt-0.5">•</span>
                        <span className="font-medium">{tip}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
    </div>
  );
}
