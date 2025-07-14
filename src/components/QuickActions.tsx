import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  ArrowRightLeft, 
  Calendar, 
  FileText,
  Phone,
  Pill
} from 'lucide-react';

const quickActions = [
  {
    title: 'New Patient',
    description: 'Register new patient',
    icon: UserPlus,
    action: 'admission',
    color: 'bg-gradient-primary'
  },
  {
    title: 'Create Referral',
    description: 'Transfer patient',
    icon: ArrowRightLeft,
    action: 'referral',
    color: 'bg-gradient-success'
  },
  {
    title: 'Schedule Visit',
    description: 'Book appointment',
    icon: Calendar,
    action: 'appointment',
    color: 'bg-accent'
  },
  {
    title: 'Generate Report',
    description: 'Export data',
    icon: FileText,
    action: 'report',
    color: 'bg-muted'
  },
  {
    title: 'Emergency Call',
    description: 'Quick contact',
    icon: Phone,
    action: 'emergency',
    color: 'bg-destructive'
  },
  {
    title: 'Pharmacy Order',
    description: 'Submit prescription',
    icon: Pill,
    action: 'pharmacy',
    color: 'bg-warning'
  }
];

export const QuickActions = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-center text-center space-y-2 hover:shadow-card transition-all"
            >
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};