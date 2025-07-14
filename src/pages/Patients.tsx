import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Edit,
  MoreHorizontal,
  Phone,
  Mail
} from 'lucide-react';

const patients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    mrn: 'MRN-2024-001',
    phone: '+234-901-2345',
    email: 'sarah.j@email.com',
    lastVisit: '2024-01-15',
    status: 'Active',
    ward: 'Emergency',
    initials: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Osei',
    age: 45,
    gender: 'Male',
    mrn: 'MRN-2024-002',
    phone: '+233-555-0123',
    email: 'michael.o@email.com',
    lastVisit: '2024-01-14',
    status: 'Referred',
    ward: 'Cardiology',
    initials: 'MO'
  },
  {
    id: 3,
    name: 'Amina Hassan',
    age: 28,
    gender: 'Female',
    mrn: 'MRN-2024-003',
    phone: '+254-777-8888',
    email: 'amina.h@email.com',
    lastVisit: '2024-01-13',
    status: 'Discharged',
    ward: 'General',
    initials: 'AH'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-success text-success-foreground';
    case 'Referred': return 'bg-warning text-warning-foreground';
    case 'Discharged': return 'bg-muted text-muted-foreground';
    default: return 'bg-primary text-primary-foreground';
  }
};

const Patients = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and medical information</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-hover">
          <UserPlus className="h-4 w-4 mr-2" />
          New Patient
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search patients by name, MRN, or phone..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {patient.initials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-semibold text-foreground">{patient.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{patient.age} years • {patient.gender}</span>
                        <span>MRN: {patient.mrn}</span>
                        <span>Ward: {patient.ward}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span className="text-xs">{patient.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Last Visit</div>
                      <div className="font-medium">{patient.lastVisit}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;