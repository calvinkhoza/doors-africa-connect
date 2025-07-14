import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Bed, 
  ArrowRightLeft, 
  FileText, 
  Activity, 
  Calendar,
  Pill
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Bed Management', href: '/beds', icon: Bed },
  { name: 'Referrals', href: '/referrals', icon: ArrowRightLeft },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Pharmacy', href: '/pharmacy', icon: Pill },
  { name: 'Vitals', href: '/vitals', icon: Activity },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex flex-col w-64 bg-card border-r border-border h-[calc(100vh-73px)] shadow-card">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Main Menu
        </h2>
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-medical"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-border">
        <div className="bg-gradient-primary rounded-lg p-3 text-center">
          <div className="text-primary-foreground text-sm font-medium">
            System Status
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-primary-foreground text-xs">All Systems Operational</span>
          </div>
        </div>
      </div>
    </nav>
  );
};