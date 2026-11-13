
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  ChartPie,
  Settings,
  CircleHelp,
  WalletCards,
} from 'lucide-react';

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Transactions', icon: ArrowLeftRight },
  { label: 'Budgets', icon: Wallet },
  { label: 'Categories', icon: ChartPie },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-slate-950 text-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
        <div className="rounded-lg bg-indigo-600 p-2">
          <WalletCards size={22} />
        </div>
        <span className="text-xl font-bold tracking-tight">
          ExpenseFlow
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-8">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Menu
        </p>

        <nav className="space-y-2">
          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  index === 0
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <p className="mb-4 mt-10 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Preferences
        </p>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
          <Settings size={19} />
          Settings
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
          <CircleHelp size={19} />
          Help & Support
        </button>
      </div>

      {/* User profile */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold">
            M
          </div>
          <div>
            <p className="text-sm font-medium">Mehul</p>
            <p className="text-xs text-slate-400">Personal Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
