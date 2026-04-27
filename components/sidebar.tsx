'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/contrats', label: 'Contrats', icon: FileText },
    { href: '/clients', label: 'Clients', icon: Users },
    { href: '/users', label: 'Utilisateurs', icon: Shield },
    { href: '/settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground h-screen flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo and Toggle */}
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
        {isOpen && <h1 className="text-2xl font-bold text-sidebar-primary">ContractHub</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-sidebar-accent/20 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent-foreground'
              )}
              title={!isOpen ? link.label : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
