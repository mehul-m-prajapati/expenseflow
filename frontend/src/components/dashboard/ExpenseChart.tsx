
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', income: 55000, expenses: 32000 },
  { month: 'Feb', income: 62000, expenses: 35000 },
  { month: 'Mar', income: 58000, expenses: 29000 },
  { month: 'Apr', income: 65000, expenses: 38000 },
  { month: 'May', income: 68000, expenses: 42000 },
  { month: 'Jun', income: 65000, expenses: 32500 },
];

export default function ExpenseChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Income vs Expenses
        </h3>

        <p className="text-sm text-slate-500">
          Your monthly financial activity
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" />

            <YAxis
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
            />

            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#10B981"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#6366F1"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
