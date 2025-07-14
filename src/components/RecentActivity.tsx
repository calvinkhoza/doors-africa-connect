import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, ArrowRight } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'admission',
    patient: 'Sarah Johnson',
    action: 'admitted to Emergency Ward',
    time: '2 minutes ago',
    status: 'active',
    initials: 'SJ'
  },
  {
    id: 2,
    type: 'referral',
    patient: 'Michael Osei',
    action: 'referred to Cardiology',
    time: '15 minutes ago',
    status: 'pending',
    initials: 'MO'
  },
  {
    id: 3,
    type: 'discharge',
    patient: 'Amina Hassan',
    action: 'discharged from ICU',
    time: '1 hour ago',
    status: 'completed',
    initials: 'AH'
  },
  {
    id: 4,
    type: 'transfer',
    patient: 'John Doe',
    action: 'transferred to General Medicine',
    time: '2 hours ago',
    status: 'completed',
    initials: 'JD'
  },
  {
    id: 5,
    type: 'appointment',
    patient: 'Grace Nkomo',
    action: 'scheduled for surgery',
    time: '3 hours ago',
    status: 'scheduled',
    initials: 'GN'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-success text-success-foreground';
    case 'pending': return 'bg-warning text-warning-foreground';
    case 'completed': return 'bg-muted text-muted-foreground';
    case 'scheduled': return 'bg-primary text-primary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'admission': return '🏥';
    case 'referral': return '↗️';
    case 'discharge': return '🚪';
    case 'transfer': return '↔️';
    case 'appointment': return '📅';
    default: return '📋';
  }
};

export const RecentActivity = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <Badge variant="outline">Live Updates</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-secondary rounded-lg transition-colors">
              <div className="text-2xl">{getActivityIcon(activity.type)}</div>
              
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground truncate">
                    {activity.patient}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground truncate">
                    {activity.action}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};