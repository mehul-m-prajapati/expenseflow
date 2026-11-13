
import { Bell, Search, Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Overview
        </h1>
        <p className="text-sm text-slate-500">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Search size={20} />
        </button>

        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
          <Plus size={18} />
          Add Expense
        </button>
      </div>
    </header>
  );
}
