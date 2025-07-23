'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, CheckSquare, Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Visão Geral',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Minhas Tarefas',
      href: '/dashboard/tasks',
      icon: CheckSquare,
    },
    {
      name: 'Calendário',
      href: '/dashboard/calendar',
      icon: Calendar,
    },
    {
      name: 'Configurações',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  return (
    <nav className="flex flex-col h-full justify-between">
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-100'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400',
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <form action="/api/auth/signout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sair
          </Button>
        </form>
      </div>
    </nav>
  );
}
