'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Bell, Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  setMobileOpen?: (open: boolean) => void;
}

export default function Navbar({ searchTerm, setSearchTerm, setMobileOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Bar */}
        <div className="relative w-48 sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-indigo-500 focus:outline-none dark:text-zinc-100 text-zinc-900 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-600" />}
          </button>
        )}

        <button className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
        </button>

        <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            A
          </div>
          <span className="text-sm font-medium hidden md:inline-block">Admin Demo</span>
        </div>
      </div>
    </header>
  );
}