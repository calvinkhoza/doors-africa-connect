import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowRightLeft, 
  Clock, 
  User, 
  Hospital,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const referrals = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    patientMrn: 'MRN-2024-001',
    fromWard: 'Emergency',
    toSpecialty: 'Cardiology',
    referringDoctor: 'Dr. Kwame Asante',
    receivingDoctor: 'Dr. Grace Nkomo',
    reason: 'Chest pain, abnormal ECG',
    urgency: 'Urgent',
    status: 'Pending',
    dateCreated: '2024-01-15',
    expectedDate: '2024-01-16',
    initials: 'SJ'
  },
  {
    id: 2,
    patientName: 'Michael Osei',
    patientMrn: 'MRN-2024-002',
    fromWard: 'General Medicine',
    toSpecialty: 'Orthopedics',
    referringDoctor: 'Dr. Amina Hassan',
    receivingDoctor: 'Dr. John Mensah',
    reason: 'Chronic back pain, suspected herniated disc',
    urgency: 'Routine',
    status: 'Approved',
    dateCreated: '2024-01-14',
    expectedDate: '2024-01-18',
    initials: 'MO'
  },
  {
    id: 3,
    patientName: 'Fatima Al-Rashid',
    patientMrn: 'MRN-2024-003',
    fromWard: 'Pediatrics',
    toSpecialty: 'Neurology',
    referringDoctor: 'Dr. Peter Ochieng',
    receivingDoctor: 'Dr. Lisa Makena',
    reason: 'Recurrent seizures',
    urgency: 'Critical',
    status: 'In Progress',
    dateCreated: '2024-01-13',
    expectedDate: '2024-01-15',
    initials: 'FA'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Pending': return <Clock className="h-4 w-4" />;
    case 'Approved': return <CheckCircle className="h-4 w-4" />;
    case 'Rejected': return <XCircle className="h-4 w-4" />;
    case 'In Progress': return <AlertCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-warning text-warning-foreground';
    case 'Approved': return 'bg-success text-success-foreground';
    case 'Rejected': return 'bg-destructive text-destructive-foreground';
    case 'In Progress': return 'bg-primary text-primary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'Critical': return 'bg-destructive text-destructive-foreground';
    case 'Urgent': return 'bg-warning text-warning-foreground';
    case 'Routine': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Referrals = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Referrals</h1>
          <p className="text-muted-foreground">Manage patient transfers and specialty referrals</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-hover">
          <Plus className="h-4 w-4 mr-2" />
          New Referral
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">15</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5" />
            <span>Active Referrals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referrals.map((referral) => (
              <div key={referral.id} className="border border-border rounded-lg p-6 hover:shadow-card transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {referral.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{referral.patientName}</h3>
                      <p className="text-sm text-muted-foreground">{referral.patientMrn}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getUrgencyColor(referral.urgency)}>
                      {referral.urgency}
                    </Badge>
                    <Badge className={getStatusColor(referral.status)}>
                      {getStatusIcon(referral.status)}
                      <span className="ml-1">{referral.status}</span>
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Referral Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Hospital className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-medium">{referral.fromWard}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">To:</span>
                        <span className="font-medium">{referral.toSpecialty}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Referring:</span>
                        <span className="font-medium">{referral.referringDoctor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Receiving:</span>
                        <span className="font-medium">{referral.receivingDoctor}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium ml-2">{referral.dateCreated}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected:</span>
                        <span className="font-medium ml-2">{referral.expectedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Reason for Referral</h4>
                  <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-lg">
                    {referral.reason}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                  <Button size="sm" className="bg-gradient-primary">
                    Process Referral
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Referrals;