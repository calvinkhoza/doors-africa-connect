import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Plus,
  Search,
  Filter,
  User,
  MapPin,
  Phone,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  CalendarDays
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const appointmentsData = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    patientMrn: 'MRN-2024-001',
    doctorName: 'Dr. Kwame Asante',
    specialty: 'Cardiology',
    date: '2024-01-16',
    time: '10:00',
    duration: 30,
    type: 'consultation',
    status: 'scheduled',
    location: 'Room 201',
    reason: 'Follow-up for chest pain',
    phone: '+234-901-2345',
    notes: 'Patient reported improvement in symptoms',
    priority: 'normal'
  },
  {
    id: 2,
    patientName: 'Michael Osei',
    patientMrn: 'MRN-2024-002',
    doctorName: 'Dr. Grace Nkomo',
    specialty: 'Orthopedics',
    date: '2024-01-16',
    time: '14:30',
    duration: 45,
    type: 'procedure',
    status: 'confirmed',
    location: 'OR 3',
    reason: 'Knee arthroscopy',
    phone: '+233-555-0123',
    notes: 'Pre-op clearance completed',
    priority: 'high'
  },
  {
    id: 3,
    patientName: 'Amina Hassan',
    patientMrn: 'MRN-2024-003',
    doctorName: 'Dr. Lisa Makena',
    specialty: 'General Medicine',
    date: '2024-01-16',
    time: '09:15',
    duration: 20,
    type: 'check-up',
    status: 'completed',
    location: 'Room 105',
    reason: 'Annual physical examination',
    phone: '+254-777-8888',
    notes: 'All vitals normal, lab results pending',
    priority: 'normal'
  },
  {
    id: 4,
    patientName: 'John Mensah',
    patientMrn: 'MRN-2024-004',
    doctorName: 'Dr. Peter Ochieng',
    specialty: 'Pediatrics',
    date: '2024-01-16',
    time: '16:00',
    duration: 25,
    type: 'consultation',
    status: 'no-show',
    location: 'Pediatric Wing',
    reason: 'Vaccination schedule',
    phone: '+233-444-5555',
    notes: 'Patient did not arrive for appointment',
    priority: 'normal'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-primary text-primary-foreground';
    case 'confirmed': return 'bg-success text-success-foreground';
    case 'completed': return 'bg-muted text-muted-foreground';
    case 'cancelled': return 'bg-destructive text-destructive-foreground';
    case 'no-show': return 'bg-warning text-warning-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive text-destructive-foreground';
    case 'medium': return 'bg-warning text-warning-foreground';
    case 'normal': return 'bg-success text-success-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'scheduled': return <Clock className="h-4 w-4" />;
    case 'confirmed': return <CheckCircle className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    case 'cancelled': return <XCircle className="h-4 w-4" />;
    case 'no-show': return <AlertCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const AppointmentForm = ({ appointment, onSave, onClose }: { 
  appointment?: any, 
  onSave: (data: any) => void, 
  onClose: () => void 
}) => {
  const [formData, setFormData] = useState({
    patientName: appointment?.patientName || '',
    patientMrn: appointment?.patientMrn || '',
    doctorName: appointment?.doctorName || '',
    specialty: appointment?.specialty || '',
    date: appointment?.date || '',
    time: appointment?.time || '',
    duration: appointment?.duration || 30,
    type: appointment?.type || 'consultation',
    location: appointment?.location || '',
    reason: appointment?.reason || '',
    phone: appointment?.phone || '',
    notes: appointment?.notes || '',
    priority: appointment?.priority || 'normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, status: 'scheduled' });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="patientName">Patient Name</Label>
          <Input
            id="patientName"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="patientMrn">Patient MRN</Label>
          <Input
            id="patientMrn"
            value={formData.patientMrn}
            onChange={(e) => setFormData({ ...formData, patientMrn: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="doctorName">Doctor</Label>
          <Select value={formData.doctorName} onValueChange={(value) => setFormData({ ...formData, doctorName: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dr. Kwame Asante">Dr. Kwame Asante</SelectItem>
              <SelectItem value="Dr. Grace Nkomo">Dr. Grace Nkomo</SelectItem>
              <SelectItem value="Dr. Lisa Makena">Dr. Lisa Makena</SelectItem>
              <SelectItem value="Dr. Peter Ochieng">Dr. Peter Ochieng</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cardiology">Cardiology</SelectItem>
              <SelectItem value="Orthopedics">Orthopedics</SelectItem>
              <SelectItem value="General Medicine">General Medicine</SelectItem>
              <SelectItem value="Pediatrics">Pediatrics</SelectItem>
              <SelectItem value="Surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration (min)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Appointment Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="procedure">Procedure</SelectItem>
              <SelectItem value="check-up">Check-up</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Room number or location"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Patient phone number"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="reason">Reason for Visit</Label>
        <Input
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          placeholder="Brief description of visit reason"
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-primary">
          {appointment ? 'Update Appointment' : 'Schedule Appointment'}
        </Button>
      </div>
    </form>
  );
};

const Appointments = () => {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [selectedDate, setSelectedDate] = useState('2024-01-16');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = selectedDate === 'all' || appointment.date === selectedDate;
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    const matchesSpecialty = selectedSpecialty === 'all' || appointment.specialty === selectedSpecialty;
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.patientMrn.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDate && matchesStatus && matchesSpecialty && matchesSearch;
  });

  const appointmentStats = {
    total: appointments.length,
    scheduled: appointments.filter(a => a.status === 'scheduled').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    noShow: appointments.filter(a => a.status === 'no-show').length
  };

  const handleSaveAppointment = (appointmentData: any) => {
    if (editingAppointment) {
      setAppointments(appointments.map(appointment => 
        appointment.id === editingAppointment.id 
          ? { ...appointment, ...appointmentData }
          : appointment
      ));
      setEditingAppointment(null);
    } else {
      const newAppointment = {
        id: appointments.length + 1,
        ...appointmentData
      };
      setAppointments([...appointments, newAppointment]);
    }
    setShowAddAppointment(false);
  };

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: newStatus }
        : appointment
    ));
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Dialog open={showAddAppointment} onOpenChange={setShowAddAppointment}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-hover">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <AppointmentForm 
              onSave={handleSaveAppointment} 
              onClose={() => setShowAddAppointment(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{appointmentStats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{appointmentStats.scheduled}</div>
              <div className="text-sm text-muted-foreground">Scheduled</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{appointmentStats.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{appointmentStats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{appointmentStats.noShow}</div>
              <div className="text-sm text-muted-foreground">No Show</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search appointments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full md:w-48"
            />
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                <SelectItem value="General Medicine">General Medicine</SelectItem>
                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5" />
            <span>Today's Appointments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.patientMrn}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{appointment.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(appointment.priority)}>
                      {appointment.priority}
                    </Badge>
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusIcon(appointment.status)}
                      <span className="ml-1 capitalize">{appointment.status}</span>
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Appointment Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.date}</span>
                        <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                        <span>{appointment.time} ({appointment.duration}min)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Medical Team</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.doctorName}</span>
                      </div>
                      <div className="text-muted-foreground">{appointment.specialty}</div>
                      <div className="text-muted-foreground capitalize">{appointment.type}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Visit Information</h4>
                    <div className="text-sm">
                      <div className="font-medium">{appointment.reason}</div>
                      {appointment.notes && (
                        <div className="text-muted-foreground mt-1">{appointment.notes}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Select 
                    value={appointment.status} 
                    onValueChange={(value) => handleStatusChange(appointment.id, value)}
                  >
                    <SelectTrigger className="w-40 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no-show">No Show</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingAppointment(appointment)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Appointment</DialogTitle>
                        </DialogHeader>
                        <AppointmentForm 
                          appointment={editingAppointment}
                          onSave={handleSaveAppointment} 
                          onClose={() => setEditingAppointment(null)} 
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
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

export default Appointments;