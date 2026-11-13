
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import SummaryCards from './components/dashboard/SummaryCards';
import ExpenseChart from './components/dashboard/ExpenseChart';
import RecentTransactions from './components/dashboard/RecentTransactions';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="space-y-8 p-8">
          {/* Page heading */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your money.
            </p>
          </div>

          {/* Summary cards */}
          <SummaryCards />

          {/* Chart */}
          <ExpenseChart />

          {/* Transactions */}
          <RecentTransactions />
        </div>
      </main>
    </div>
  );
}

export default App;
