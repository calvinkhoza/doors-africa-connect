import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, UserCircle, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MobileNavigation } from './MobileNavigation';

export const Header = () => {
  return (
    <header className="bg-card border-b border-border px-4 py-3 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <MobileNavigation />
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">DOORS</h1>
              <p className="text-xs text-muted-foreground">Healthcare Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </Button>
          
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-secondary rounded-lg">
            <div className="h-2 w-2 bg-success rounded-full"></div>
            <span className="text-sm text-secondary-foreground">Online</span>
          </div>
          
          <Button variant="ghost" size="sm">
            <UserCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};