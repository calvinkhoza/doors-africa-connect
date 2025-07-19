import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Pill,
  FileText,
  ShoppingCart,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';

const prescriptions = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    patientId: 'MRN-2024-001',
    prescriber: 'Dr. Amina Hassan',
    medications: [
      { name: 'Amoxicillin 500mg', quantity: 21, frequency: '3 times daily', duration: '7 days' },
      { name: 'Paracetamol 500mg', quantity: 20, frequency: '4 times daily', duration: '5 days' }
    ],
    status: 'pending',
    priority: 'normal',
    prescribedDate: '2024-01-15',
    notes: 'Take with food'
  },
  {
    id: 2,
    patientName: 'Michael Osei',
    patientId: 'MRN-2024-002',
    prescriber: 'Dr. John Kimani',
    medications: [
      { name: 'Metformin 850mg', quantity: 30, frequency: '2 times daily', duration: '30 days' },
      { name: 'Lisinopril 10mg', quantity: 30, frequency: 'Once daily', duration: '30 days' }
    ],
    status: 'ready',
    priority: 'high',
    prescribedDate: '2024-01-14',
    notes: 'Chronic medication refill'
  },
  {
    id: 3,
    patientName: 'Amina Hassan',
    patientId: 'MRN-2024-003',
    prescriber: 'Dr. Mary Wanjiku',
    medications: [
      { name: 'Iron Tablets 200mg', quantity: 60, frequency: 'Once daily', duration: '60 days' }
    ],
    status: 'dispensed',
    priority: 'normal',
    prescribedDate: '2024-01-13',
    dispensedDate: '2024-01-13',
    notes: 'Prenatal vitamins'
  }
];

const inventory = [
  { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 450, reorderLevel: 100, unit: 'tablets', supplier: 'MediSupply Kenya', lastUpdated: '2024-01-15' },
  { id: 2, name: 'Paracetamol 500mg', category: 'Analgesics', stock: 850, reorderLevel: 200, unit: 'tablets', supplier: 'PharmaCorp Ltd', lastUpdated: '2024-01-15' },
  { id: 3, name: 'Metformin 850mg', category: 'Diabetes', stock: 75, reorderLevel: 100, unit: 'tablets', supplier: 'HealthFirst', lastUpdated: '2024-01-14' },
  { id: 4, name: 'Lisinopril 10mg', category: 'Hypertension', stock: 25, reorderLevel: 50, unit: 'tablets', supplier: 'MediSupply Kenya', lastUpdated: '2024-01-13' },
  { id: 5, name: 'Iron Tablets 200mg', category: 'Supplements', stock: 300, reorderLevel: 80, unit: 'tablets', supplier: 'VitaMed', lastUpdated: '2024-01-15' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-warning text-warning-foreground';
    case 'ready': return 'bg-success text-success-foreground';
    case 'dispensed': return 'bg-muted text-muted-foreground';
    default: return 'bg-primary text-primary-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive text-destructive-foreground';
    case 'normal': return 'bg-primary text-primary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getStockStatus = (current: number, reorder: number) => {
  if (current <= reorder * 0.5) return { status: 'critical', color: 'text-destructive' };
  if (current <= reorder) return { status: 'low', color: 'text-warning' };
  return { status: 'good', color: 'text-success' };
};

const Pharmacy = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [newMedication, setNewMedication] = useState({
    name: '',
    category: '',
    stock: '',
    reorderLevel: '',
    unit: '',
    supplier: ''
  });

  const filteredPrescriptions = prescriptions.filter(p => 
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = prescriptions.filter(p => p.status === 'pending').length;
  const readyCount = prescriptions.filter(p => p.status === 'ready').length;
  const lowStockCount = inventory.filter(item => item.stock <= item.reorderLevel).length;
  const criticalStockCount = inventory.filter(item => item.stock <= item.reorderLevel * 0.5).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pharmacy Management</h1>
          <p className="text-muted-foreground">Manage prescriptions, inventory, and medication dispensing</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Medication Name</Label>
                <Input 
                  placeholder="e.g., Amoxicillin 500mg"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newMedication.category} onValueChange={(value) => setNewMedication({...newMedication, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                    <SelectItem value="Analgesics">Analgesics</SelectItem>
                    <SelectItem value="Diabetes">Diabetes</SelectItem>
                    <SelectItem value="Hypertension">Hypertension</SelectItem>
                    <SelectItem value="Supplements">Supplements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Initial Stock</Label>
                  <Input 
                    type="number"
                    placeholder="0"
                    value={newMedication.stock}
                    onChange={(e) => setNewMedication({...newMedication, stock: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reorder Level</Label>
                  <Input 
                    type="number"
                    placeholder="0"
                    value={newMedication.reorderLevel}
                    onChange={(e) => setNewMedication({...newMedication, reorderLevel: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={newMedication.unit} onValueChange={(value) => setNewMedication({...newMedication, unit: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablets">Tablets</SelectItem>
                    <SelectItem value="capsules">Capsules</SelectItem>
                    <SelectItem value="ml">ML</SelectItem>
                    <SelectItem value="bottles">Bottles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Input 
                  placeholder="Supplier name"
                  value={newMedication.supplier}
                  onChange={(e) => setNewMedication({...newMedication, supplier: e.target.value})}
                />
              </div>
              <Button className="w-full bg-gradient-primary">Add Medication</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Prescriptions</p>
                <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Ready for Pickup</p>
                <p className="text-2xl font-bold text-success">{readyCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-warning">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Critical Stock</p>
                <p className="text-2xl font-bold text-destructive">{criticalStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Prescription Queue</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search prescriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground">{prescription.patientName}</h3>
                          <Badge variant="outline">{prescription.patientId}</Badge>
                          <Badge className={getStatusColor(prescription.status)}>
                            {prescription.status}
                          </Badge>
                          <Badge className={getPriorityColor(prescription.priority)}>
                            {prescription.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          Prescribed by: {prescription.prescriber} • {prescription.prescribedDate}
                        </p>
                        
                        <div className="space-y-1">
                          {prescription.medications.map((med, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Pill className="h-3 w-3 text-primary" />
                              <span>{med.name} - {med.quantity} {med.frequency} for {med.duration}</span>
                            </div>
                          ))}
                        </div>
                        
                        {prescription.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Notes: {prescription.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Prescription Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Patient</Label>
                                  <p className="font-medium">{prescription.patientName}</p>
                                  <p className="text-sm text-muted-foreground">{prescription.patientId}</p>
                                </div>
                                <div>
                                  <Label>Prescriber</Label>
                                  <p className="font-medium">{prescription.prescriber}</p>
                                  <p className="text-sm text-muted-foreground">{prescription.prescribedDate}</p>
                                </div>
                              </div>
                              
                              <div>
                                <Label>Medications</Label>
                                <div className="space-y-2 mt-2">
                                  {prescription.medications.map((med, index) => (
                                    <div key={index} className="p-3 border rounded-lg">
                                      <div className="font-medium">{med.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        Quantity: {med.quantity} • Frequency: {med.frequency} • Duration: {med.duration}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {prescription.notes && (
                                <div>
                                  <Label>Notes</Label>
                                  <p className="text-sm">{prescription.notes}</p>
                                </div>
                              )}
                              
                              <div className="flex space-x-2">
                                <Button className="bg-gradient-primary flex-1">
                                  Mark as Ready
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  Dispense Now
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {prescription.status === 'pending' && (
                          <Button size="sm" className="bg-gradient-primary">
                            Process
                          </Button>
                        )}
                        {prescription.status === 'ready' && (
                          <Button size="sm" variant="outline">
                            Dispense
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medication Inventory</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInventory.map((item) => {
                  const stockStatus = getStockStatus(item.stock, item.reorderLevel);
                  return (
                    <div key={item.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                            <Badge className={stockStatus.color}>
                              {stockStatus.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Current Stock:</span>
                              <span className={`font-medium ml-1 ${stockStatus.color}`}>
                                {item.stock} {item.unit}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Reorder Level:</span>
                              <span className="font-medium ml-1">{item.reorderLevel} {item.unit}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Supplier:</span>
                              <span className="font-medium ml-1">{item.supplier}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            Last updated: {item.lastUpdated}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Package className="h-4 w-4 mr-2" />
                            Restock
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Pharmacy Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Total Prescriptions Today</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Medications Dispensed</span>
                  <span className="font-bold">18</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Revenue Today</span>
                  <span className="font-bold">$1,245</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Pending Orders</span>
                  <span className="font-bold text-warning">6</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Daily Dispensing Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Inventory Status Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Monthly Sales Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Low Stock Alert Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pharmacy;