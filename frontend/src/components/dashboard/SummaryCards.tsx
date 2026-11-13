
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from 'lucide-react';

const summaries = [
  {
    title: 'Total Balance',
    amount: '₹1,25,000',
    change: '+12.5%',
    description: 'Compared to last month',
    icon: Wallet,
    color: 'bg-indigo-100 text-indigo-600',
    positive: true,
  },
  {
    title: 'Monthly Income',
    amount: '₹65,000',
    change: '+8.2%',
    description: 'Compared to last month',
    icon: TrendingUp,
    color: 'bg-emerald-100 text-emerald-600',
    positive: true,
  },
  {
    title: 'Monthly Expenses',
    amount: '₹32,500',
    change: '+4.3%',
    description: 'Compared to last month',
    icon: TrendingDown,
    color: 'bg-rose-100 text-rose-600',
    positive: false,
  },
  {
    title: 'Monthly Savings',
    amount: '₹32,500',
    change: '+15.8%',
    description: 'Compared to last month',
    icon: PiggyBank,
    color: 'bg-amber-100 text-amber-600',
    positive: true,
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {summaries.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {item.title}
              </p>

              <div className={`rounded-lg p-2 ${item.color}`}>
                <Icon size={20} />
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              {item.amount}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-xs">
              <span
                className={`font-semibold ${
                  item.positive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {item.change}
              </span>

              <span className="text-slate-400">
                {item.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
