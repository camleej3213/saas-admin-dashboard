'use client';

import { LayoutDashboard, ShoppingCart, Users, BarChart3, Settings, LogOut, X } from 'lucide-react';
import { toast } from 'sonner';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Orders', icon: ShoppingCart },
  { label: 'Customers', icon: Users },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen = false, setMobileOpen }: SidebarProps) {
  const handleLogout = () => {
    toast.error('Logged out of demo account.');
    if (setMobileOpen) setMobileOpen(false);
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full min-h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
      <div>
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">PulseAnalytics</span>
          </div>
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                toast.info(`Navigated to ${item.label}`);
                if (setMobileOpen) setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                item.active
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:text-zinc-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="w-64 hidden md:block flex-shrink-0 min-h-screen">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay & Slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen && setMobileOpen(false)}
          />

          {/* Drawer menu */}
          <div className="fixed inset-y-0 left-0 w-64 z-50">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}