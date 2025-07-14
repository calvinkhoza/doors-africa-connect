import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  Menu,
  Home, 
  Users, 
  Bed, 
  ArrowRightLeft, 
  FileText, 
  Activity, 
  Calendar,
  Pill,
  X
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

export const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full bg-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">DOORS</h1>
                  <p className="text-xs text-muted-foreground">Healthcare</p>
                </div>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
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
          </nav>
          
          <div className="p-4 border-t border-border">
            <div className="bg-gradient-primary rounded-lg p-4 text-center">
              <div className="text-primary-foreground text-sm font-medium mb-2">
                System Status
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-primary-foreground text-xs">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};