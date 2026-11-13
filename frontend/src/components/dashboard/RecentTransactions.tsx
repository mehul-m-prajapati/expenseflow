
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const transactions = [
  {
    title: 'Monthly Salary',
    category: 'Salary',
    date: 'Nov 01, 2026',
    amount: 65000,
    type: 'income',
  },
  {
    title: 'Grocery Shopping',
    category: 'Food',
    date: 'Nov 03, 2026',
    amount: 2500,
    type: 'expense',
  },
  {
    title: 'Netflix Subscription',
    category: 'Entertainment',
    date: 'Nov 05, 2026',
    amount: 649,
    type: 'expense',
  },
  {
    title: 'Electricity Bill',
    category: 'Utilities',
    date: 'Nov 08, 2026',
    amount: 1800,
    type: 'expense',
  },
  {
    title: 'Freelance Project',
    category: 'Other Income',
    date: 'Nov 10, 2026',
    amount: 12000,
    type: 'income',
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Transactions
          </h3>
          <p className="text-sm text-slate-500">
            Your latest financial activity
          </p>
        </div>

        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="pb-3 font-medium">Transaction</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const isIncome = transaction.type === 'income';

              return (
                <tr
                  key={transaction.title}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-lg p-2 ${
                          isIncome
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-600'
                        }`}
                      >
                        {isIncome ? (
                          <ArrowDownLeft size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </div>

                      <span className="text-sm font-medium text-slate-800">
                        {transaction.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-sm text-slate-500">
                    {transaction.category}
                  </td>

                  <td className="py-4 text-sm text-slate-500">
                    {transaction.date}
                  </td>

                  <td
                    className={`py-4 text-right text-sm font-semibold ${
                      isIncome ? 'text-emerald-600' : 'text-slate-800'
                    }`}
                  >
                    {isIncome ? '+' : '-'}₹
                    {transaction.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
