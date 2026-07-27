'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { RECENT_ORDERS } from '../data/mockData';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import Papa from 'papaparse';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredOrders = RECENT_ORDERS.filter(
    (o) =>
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    if (filteredOrders.length === 0) {
      toast.error('No data available to export.');
      return;
    }

    const csvData = filteredOrders.map((order) => ({
      'Order ID': order.id,
      Customer: order.customer,
      Email: order.email,
      Amount: order.amount,
      Status: order.status,
      Date: order.date,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `recent_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV exported successfully!');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setMobileOpen={setMobileOpen} />

        <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Dashboard Overview</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Welcome back! Here is what is happening today.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Total Revenue" value="$48,250" change="+12.5%" isPositive icon={DollarSign} />
            <MetricCard title="Total Orders" value="1,420" change="+8.2%" isPositive icon={ShoppingBag} />
            <MetricCard title="Active Customers" value="8,940" change="+18.4%" isPositive icon={Users} />
            <MetricCard title="Conversion Rate" value="3.12%" change="-0.4%" isPositive={false} icon={TrendingUp} />
          </div>

          <AnalyticsCharts />

          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="p-4 md:p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Recent Transactions</h3>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition">
                        <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{order.customer}</div>
                          <div className="text-xs text-zinc-400">{order.email}</div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">{order.amount}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                                : order.status === 'Pending'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{order.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                        No transactions match your search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
}) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-zinc-100">{value}</h3>
        <div className="flex items-center gap-1 text-xs mt-2">
          {isPositive ? (
            <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> {change}
            </span>
          ) : (
            <span className="flex items-center text-rose-600 dark:text-rose-400 font-semibold">
              <ArrowDownRight className="w-3.5 h-3.5" /> {change}
            </span>
          )}
          <span className="text-zinc-400">vs last month</span>
        </div>
      </div>
      <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}