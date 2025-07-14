import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bed, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Settings,
  MapPin,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const bedsData = [
  {
    id: 'BED-001',
    bedNumber: '101',
    ward: 'Emergency',
    floor: '1st Floor',
    status: 'occupied',
    patientName: 'Sarah Johnson',
    patientMrn: 'MRN-2024-001',
    assignedDoctor: 'Dr. Kwame Asante',
    admissionDate: '2024-01-15',
    bedType: 'Standard',
    lastCleaned: '2024-01-15 08:00',
    notes: 'Patient stable, monitoring vitals'
  },
  {
    id: 'BED-002',
    bedNumber: '102',
    ward: 'Emergency',
    floor: '1st Floor',
    status: 'available',
    patientName: null,
    patientMrn: null,
    assignedDoctor: null,
    admissionDate: null,
    bedType: 'Standard',
    lastCleaned: '2024-01-15 10:30',
    notes: 'Ready for next patient'
  },
  {
    id: 'BED-003',
    bedNumber: '201',
    ward: 'ICU',
    floor: '2nd Floor',
    status: 'maintenance',
    patientName: null,
    patientMrn: null,
    assignedDoctor: null,
    admissionDate: null,
    bedType: 'ICU',
    lastCleaned: null,
    notes: 'Equipment maintenance scheduled'
  },
  {
    id: 'BED-004',
    bedNumber: '301',
    ward: 'General Medicine',
    floor: '3rd Floor',
    status: 'reserved',
    patientName: 'Michael Osei',
    patientMrn: 'MRN-2024-002',
    assignedDoctor: 'Dr. Grace Nkomo',
    admissionDate: '2024-01-16',
    bedType: 'Standard',
    lastCleaned: '2024-01-15 14:00',
    notes: 'Reserved for incoming patient'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-bed-available text-white';
    case 'occupied': return 'bg-bed-occupied text-white';
    case 'maintenance': return 'bg-bed-maintenance text-white';
    case 'reserved': return 'bg-bed-reserved text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'available': return <CheckCircle className="h-4 w-4" />;
    case 'occupied': return <User className="h-4 w-4" />;
    case 'maintenance': return <Settings className="h-4 w-4" />;
    case 'reserved': return <Clock className="h-4 w-4" />;
    default: return <XCircle className="h-4 w-4" />;
  }
};

const BedForm = ({ bed, onSave, onClose }: { bed?: any, onSave: (data: any) => void, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    bedNumber: bed?.bedNumber || '',
    ward: bed?.ward || '',
    floor: bed?.floor || '',
    bedType: bed?.bedType || 'Standard',
    status: bed?.status || 'available',
    notes: bed?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedNumber">Bed Number</Label>
          <Input
            id="bedNumber"
            value={formData.bedNumber}
            onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="ward">Ward</Label>
          <Select value={formData.ward} onValueChange={(value) => setFormData({ ...formData, ward: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Emergency">Emergency</SelectItem>
              <SelectItem value="ICU">ICU</SelectItem>
              <SelectItem value="General Medicine">General Medicine</SelectItem>
              <SelectItem value="Pediatrics">Pediatrics</SelectItem>
              <SelectItem value="Maternity">Maternity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="floor">Floor</Label>
          <Input
            id="floor"
            value={formData.floor}
            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="bedType">Bed Type</Label>
          <Select value={formData.bedType} onValueChange={(value) => setFormData({ ...formData, bedType: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="ICU">ICU</SelectItem>
              <SelectItem value="Isolation">Isolation</SelectItem>
              <SelectItem value="Pediatric">Pediatric</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
          </SelectContent>
        </Select>
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
          {bed ? 'Update Bed' : 'Add Bed'}
        </Button>
      </div>
    </form>
  );
};

const BedManagement = () => {
  const [beds, setBeds] = useState(bedsData);
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddBed, setShowAddBed] = useState(false);
  const [editingBed, setEditingBed] = useState(null);

  const filteredBeds = beds.filter(bed => {
    const matchesWard = selectedWard === 'all' || bed.ward === selectedWard;
    const matchesStatus = selectedStatus === 'all' || bed.status === selectedStatus;
    const matchesSearch = bed.bedNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bed.patientName && bed.patientName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesWard && matchesStatus && matchesSearch;
  });

  const bedStats = {
    total: beds.length,
    available: beds.filter(b => b.status === 'available').length,
    occupied: beds.filter(b => b.status === 'occupied').length,
    maintenance: beds.filter(b => b.status === 'maintenance').length,
    reserved: beds.filter(b => b.status === 'reserved').length
  };

  const handleSaveBed = (bedData: any) => {
    if (editingBed) {
      setBeds(beds.map(bed => bed.id === editingBed.id ? { ...bed, ...bedData } : bed));
      setEditingBed(null);
    } else {
      const newBed = {
        id: `BED-${String(beds.length + 1).padStart(3, '0')}`,
        ...bedData,
        patientName: null,
        patientMrn: null,
        assignedDoctor: null,
        admissionDate: null,
        lastCleaned: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5)
      };
      setBeds([...beds, newBed]);
    }
    setShowAddBed(false);
  };

  const handleStatusChange = (bedId: string, newStatus: string) => {
    setBeds(beds.map(bed => 
      bed.id === bedId ? { ...bed, status: newStatus } : bed
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bed Management</h1>
          <p className="text-muted-foreground">Monitor and manage hospital bed availability</p>
        </div>
        <Dialog open={showAddBed} onOpenChange={setShowAddBed}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add New Bed
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Bed</DialogTitle>
            </DialogHeader>
            <BedForm 
              onSave={handleSaveBed} 
              onClose={() => setShowAddBed(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{bedStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Beds</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bed-available">{bedStats.available}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bed-occupied">{bedStats.occupied}</div>
              <div className="text-sm text-muted-foreground">Occupied</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bed-maintenance">{bedStats.maintenance}</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-bed-reserved">{bedStats.reserved}</div>
              <div className="text-sm text-muted-foreground">Reserved</div>
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
                placeholder="Search beds, wards, or patients..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="ICU">ICU</SelectItem>
                <SelectItem value="General Medicine">General Medicine</SelectItem>
                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                <SelectItem value="Maternity">Maternity</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBeds.map((bed) => (
          <Card key={bed.id} className="shadow-card hover:shadow-hover transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">{bed.bedNumber}</span>
                </div>
                <Badge className={cn("text-xs", getStatusColor(bed.status))}>
                  {getStatusIcon(bed.status)}
                  <span className="ml-1 capitalize">{bed.status}</span>
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{bed.ward} - {bed.floor}</span>
                </div>
                
                {bed.patientName && (
                  <>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{bed.patientName}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      MRN: {bed.patientMrn}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Dr: {bed.assignedDoctor}
                    </div>
                  </>
                )}

                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Cleaned: {bed.lastCleaned || 'Not recorded'}
                  </span>
                </div>

                {bed.notes && (
                  <div className="text-xs text-muted-foreground bg-secondary p-2 rounded">
                    {bed.notes}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <Select value={bed.status} onValueChange={(value) => handleStatusChange(bed.id, value)}>
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditingBed(bed)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Bed {bed.bedNumber}</DialogTitle>
                      </DialogHeader>
                      <BedForm 
                        bed={editingBed}
                        onSave={handleSaveBed} 
                        onClose={() => setEditingBed(null)} 
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BedManagement;