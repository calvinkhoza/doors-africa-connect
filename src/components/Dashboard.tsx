import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Bed, 
  Users, 
  ArrowRightLeft, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  Plus,
  Eye
} from 'lucide-react';
import { BedStatusCard } from './BedStatusCard';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import heroImage from '@/assets/healthcare-hero.jpg';

const stats = [
  {
    title: 'Total Beds',
    value: '234',
    change: '+12%',
    icon: Bed,
    trend: 'up'
  },
  {
    title: 'Active Patients',
    value: '189',
    change: '+5%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Pending Referrals',
    value: '23',
    change: '-8%',
    icon: ArrowRightLeft,
    trend: 'down'
  },
  {
    title: 'Critical Cases',
    value: '7',
    change: '+2',
    icon: AlertTriangle,
    trend: 'critical'
  }
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-hero p-8 text-primary-foreground">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to DOORS</h1>
          <p className="text-primary-foreground/90 text-lg mb-4">
            Healthcare Bed Availability & Patient Management System
          </p>
          <Button variant="secondary" className="bg-card text-card-foreground hover:bg-card/90">
            <Plus className="h-4 w-4 mr-2" />
            New Patient Admission
          </Button>
        </div>
        <div className="absolute inset-0 opacity-10">
          <img src={heroImage} alt="Healthcare Dashboard" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className={cn(
                      "h-4 w-4 mr-1",
                      stat.trend === 'up' ? "text-success" : 
                      stat.trend === 'down' ? "text-muted-foreground" :
                      "text-destructive"
                    )} />
                    <span className={cn(
                      "text-sm",
                      stat.trend === 'up' ? "text-success" : 
                      stat.trend === 'down' ? "text-muted-foreground" :
                      "text-destructive"
                    )}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  "h-12 w-12 rounded-lg flex items-center justify-center",
                  stat.trend === 'critical' ? "bg-destructive/10" : "bg-primary/10"
                )}>
                  <stat.icon className={cn(
                    "h-6 w-6",
                    stat.trend === 'critical' ? "text-destructive" : "text-primary"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Status Overview */}
        <div className="lg:col-span-2">
          <BedStatusCard />
        </div>
        
        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};