'use client';

import { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-card/50 backdrop-blur-xl border-b border-border/50 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{title}</h2>

      <div className="flex items-center gap-6">
        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-200 text-primary hover:text-primary/80"
          >
            <User size={20} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-52 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 animate-scale-in overflow-hidden">
              <div className="p-4 border-b border-border/50 bg-gradient-to-br from-primary/10 to-accent/5">
                <p className="text-sm font-semibold text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>
              <Link href="/settings">
                <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-primary/20 transition-colors duration-150 group">
                  <Settings size={16} className="group-hover:text-primary transition-colors" />
                  Paramètres
                </button>
              </Link>
              <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-destructive hover:bg-destructive/20 transition-colors duration-150 border-t border-border/50 group">
                <LogOut size={16} className="group-hover:text-destructive transition-colors" />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
