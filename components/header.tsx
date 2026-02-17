'use client';

import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-8">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-4 py-2 flex-1 max-w-xs">
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
          />
        </div>

        {/* Icons */}
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <User size={20} className="text-foreground" />
        </button>
      </div>
    </header>
  );
}
