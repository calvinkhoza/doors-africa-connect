import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Heart, 
  Thermometer, 
  Activity, 
  Droplets,
  Eye,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  User,
  Calendar,
  Clock
} from 'lucide-react';

const vitalsData = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    patientId: 'MRN-2024-001',
    age: 34,
    date: '2024-01-15',
    time: '14:30',
    temperature: 37.2,
    bloodPressure: { systolic: 125, diastolic: 82 },
    heartRate: 78,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 65.5,
    height: 165,
    bmi: 24.1,
    notes: 'Patient feeling well, slight fever',
    recordedBy: 'Nurse Mary Wanjiku',
    alerts: ['temperature']
  },
  {
    id: 2,
    patientName: 'Michael Osei',
    patientId: 'MRN-2024-002',
    age: 45,
    date: '2024-01-15',
    time: '13:15',
    temperature: 36.8,
    bloodPressure: { systolic: 145, diastolic: 95 },
    heartRate: 88,
    respiratoryRate: 18,
    oxygenSaturation: 96,
    weight: 78.2,
    height: 172,
    bmi: 26.4,
    notes: 'Hypertension monitoring',
    recordedBy: 'Nurse Jennifer Asante',
    alerts: ['bloodPressure', 'oxygenSaturation']
  },
  {
    id: 3,
    patientName: 'Amina Hassan',
    patientId: 'MRN-2024-003',
    age: 28,
    date: '2024-01-15',
    time: '12:45',
    temperature: 36.5,
    bloodPressure: { systolic: 110, diastolic: 70 },
    heartRate: 72,
    respiratoryRate: 14,
    oxygenSaturation: 99,
    weight: 58.0,
    height: 160,
    bmi: 22.7,
    notes: 'Routine prenatal check',
    recordedBy: 'Nurse Grace Muthoni',
    alerts: []
  }
];

const getVitalStatus = (vital: string, value: any, patient: any) => {
  switch (vital) {
    case 'temperature':
      if (value > 37.5) return { status: 'high', color: 'text-destructive' };
      if (value < 36.0) return { status: 'low', color: 'text-primary' };
      return { status: 'normal', color: 'text-success' };
    
    case 'bloodPressure':
      const systolic = value.systolic;
      const diastolic = value.diastolic;
      if (systolic > 140 || diastolic > 90) return { status: 'high', color: 'text-destructive' };
      if (systolic < 90 || diastolic < 60) return { status: 'low', color: 'text-primary' };
      return { status: 'normal', color: 'text-success' };
    
    case 'heartRate':
      if (value > 100) return { status: 'high', color: 'text-destructive' };
      if (value < 60) return { status: 'low', color: 'text-primary' };
      return { status: 'normal', color: 'text-success' };
    
    case 'oxygenSaturation':
      if (value < 95) return { status: 'low', color: 'text-destructive' };
      if (value < 97) return { status: 'borderline', color: 'text-warning' };
      return { status: 'normal', color: 'text-success' };
    
    default:
      return { status: 'normal', color: 'text-foreground' };
  }
};

const getBMIStatus = (bmi: number) => {
  if (bmi < 18.5) return { status: 'Underweight', color: 'text-primary' };
  if (bmi < 25) return { status: 'Normal', color: 'text-success' };
  if (bmi < 30) return { status: 'Overweight', color: 'text-warning' };
  return { status: 'Obese', color: 'text-destructive' };
};

const Vitals = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newVitals, setNewVitals] = useState({
    patientId: '',
    temperature: '',
    systolic: '',
    diastolic: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    notes: ''
  });

  const filteredVitals = vitalsData.filter(v => 
    v.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const alertCount = vitalsData.filter(v => v.alerts.length > 0).length;
  const todayReadings = vitalsData.filter(v => v.date === '2024-01-15').length;
  const abnormalReadings = vitalsData.filter(v => v.alerts.length > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vital Signs Monitoring</h1>
          <p className="text-muted-foreground">Track and monitor patient vital signs and health metrics</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-hover">
              <Plus className="h-4 w-4 mr-2" />
              Record Vitals
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Record New Vital Signs</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient ID</Label>
                <Select value={newVitals.patientId} onValueChange={(value) => setNewVitals({...newVitals, patientId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MRN-2024-001">Sarah Johnson (MRN-2024-001)</SelectItem>
                    <SelectItem value="MRN-2024-002">Michael Osei (MRN-2024-002)</SelectItem>
                    <SelectItem value="MRN-2024-003">Amina Hassan (MRN-2024-003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Temperature (°C)</Label>
                <Input 
                  type="number"
                  step="0.1"
                  placeholder="36.5"
                  value={newVitals.temperature}
                  onChange={(e) => setNewVitals({...newVitals, temperature: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Blood Pressure (Systolic)</Label>
                <Input 
                  type="number"
                  placeholder="120"
                  value={newVitals.systolic}
                  onChange={(e) => setNewVitals({...newVitals, systolic: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Blood Pressure (Diastolic)</Label>
                <Input 
                  type="number"
                  placeholder="80"
                  value={newVitals.diastolic}
                  onChange={(e) => setNewVitals({...newVitals, diastolic: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Heart Rate (bpm)</Label>
                <Input 
                  type="number"
                  placeholder="72"
                  value={newVitals.heartRate}
                  onChange={(e) => setNewVitals({...newVitals, heartRate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Respiratory Rate (rpm)</Label>
                <Input 
                  type="number"
                  placeholder="16"
                  value={newVitals.respiratoryRate}
                  onChange={(e) => setNewVitals({...newVitals, respiratoryRate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Oxygen Saturation (%)</Label>
                <Input 
                  type="number"
                  placeholder="98"
                  value={newVitals.oxygenSaturation}
                  onChange={(e) => setNewVitals({...newVitals, oxygenSaturation: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input 
                  type="number"
                  step="0.1"
                  placeholder="65.0"
                  value={newVitals.weight}
                  onChange={(e) => setNewVitals({...newVitals, weight: e.target.value})}
                />
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label>Height (cm)</Label>
                <Input 
                  type="number"
                  placeholder="165"
                  value={newVitals.height}
                  onChange={(e) => setNewVitals({...newVitals, height: e.target.value})}
                />
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label>Notes</Label>
                <Input 
                  placeholder="Additional observations..."
                  value={newVitals.notes}
                  onChange={(e) => setNewVitals({...newVitals, notes: e.target.value})}
                />
              </div>
              
              <div className="col-span-2">
                <Button className="w-full bg-gradient-primary">Save Vital Signs</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Today's Readings</p>
                <p className="text-2xl font-bold text-foreground">{todayReadings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-warning">{alertCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Abnormal Readings</p>
                <p className="text-2xl font-bold text-destructive">{abnormalReadings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Patients Monitored</p>
                <p className="text-2xl font-bold text-success">{vitalsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Readings</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Warnings</TabsTrigger>
          <TabsTrigger value="trends">Trends & Analytics</TabsTrigger>
        </TabsList>

        {/* Recent Readings Tab */}
        <TabsContent value="recent" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Latest Vital Signs</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVitals.map((vital) => (
                  <div key={vital.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-semibold text-foreground">{vital.patientName}</h3>
                          <Badge variant="outline">{vital.patientId}</Badge>
                          <Badge variant="outline">{vital.age} years</Badge>
                          {vital.alerts.length > 0 && (
                            <Badge className="bg-destructive text-destructive-foreground">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {vital.alerts.length} Alert{vital.alerts.length > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Temperature</p>
                              <p className={`font-medium ${getVitalStatus('temperature', vital.temperature, vital).color}`}>
                                {vital.temperature}°C
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Heart className="h-4 w-4 text-destructive" />
                            <div>
                              <p className="text-xs text-muted-foreground">Blood Pressure</p>
                              <p className={`font-medium ${getVitalStatus('bloodPressure', vital.bloodPressure, vital).color}`}>
                                {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-success" />
                            <div>
                              <p className="text-xs text-muted-foreground">Heart Rate</p>
                              <p className={`font-medium ${getVitalStatus('heartRate', vital.heartRate, vital).color}`}>
                                {vital.heartRate} bpm
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">O2 Saturation</p>
                              <p className={`font-medium ${getVitalStatus('oxygenSaturation', vital.oxygenSaturation, vital).color}`}>
                                {vital.oxygenSaturation}%
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Respiratory:</span>
                            <span className="font-medium ml-1">{vital.respiratoryRate} rpm</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Weight:</span>
                            <span className="font-medium ml-1">{vital.weight} kg</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">BMI:</span>
                            <span className={`font-medium ml-1 ${getBMIStatus(vital.bmi).color}`}>
                              {vital.bmi} ({getBMIStatus(vital.bmi).status})
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {vital.date} at {vital.time} • by {vital.recordedBy}
                          </div>
                        </div>
                        
                        {vital.notes && (
                          <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded">
                            {vital.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detailed Vital Signs - {vital.patientName}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Patient Information</Label>
                                  <div className="mt-2 space-y-1">
                                    <p className="font-medium">{vital.patientName}</p>
                                    <p className="text-sm text-muted-foreground">{vital.patientId} • {vital.age} years</p>
                                    <p className="text-sm text-muted-foreground">{vital.date} at {vital.time}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Recorded By</Label>
                                  <p className="font-medium mt-2">{vital.recordedBy}</p>
                                </div>
                              </div>
                              
                              <div>
                                <Label>Vital Signs</Label>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                  <div className="p-3 border rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <Thermometer className="h-4 w-4" />
                                      <span className="font-medium">Temperature</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-1">{vital.temperature}°C</p>
                                  </div>
                                  
                                  <div className="p-3 border rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <Heart className="h-4 w-4" />
                                      <span className="font-medium">Blood Pressure</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-1">{vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}</p>
                                  </div>
                                  
                                  <div className="p-3 border rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <Activity className="h-4 w-4" />
                                      <span className="font-medium">Heart Rate</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-1">{vital.heartRate} bpm</p>
                                  </div>
                                  
                                  <div className="p-3 border rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <Droplets className="h-4 w-4" />
                                      <span className="font-medium">O2 Saturation</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-1">{vital.oxygenSaturation}%</p>
                                  </div>
                                </div>
                              </div>
                              
                              {vital.notes && (
                                <div>
                                  <Label>Notes</Label>
                                  <p className="text-sm mt-2 p-3 bg-muted rounded-lg">{vital.notes}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          Trend
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Critical Alerts & Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vitalsData.filter(v => v.alerts.length > 0).map((vital) => (
                  <div key={vital.id} className="border border-destructive rounded-lg p-4 bg-destructive/5">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{vital.patientName}</h3>
                        <p className="text-sm text-muted-foreground">{vital.patientId} • {vital.date} at {vital.time}</p>
                        <div className="mt-2 space-y-1">
                          {vital.alerts.map((alert, index) => (
                            <div key={index} className="text-sm">
                              {alert === 'temperature' && (
                                <p className="text-destructive">🌡️ High temperature: {vital.temperature}°C (Normal: 36.0-37.5°C)</p>
                              )}
                              {alert === 'bloodPressure' && (
                                <p className="text-destructive">💗 High blood pressure: {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic} (Normal: 90-140/60-90)</p>
                              )}
                              {alert === 'oxygenSaturation' && (
                                <p className="text-destructive">🫁 Low oxygen saturation: {vital.oxygenSaturation}% (Normal: &gt;95%)</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-primary">
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Vitals Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Average Temperature</span>
                  <span className="font-bold">36.8°C</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Average Blood Pressure</span>
                  <span className="font-bold">127/82</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Average Heart Rate</span>
                  <span className="font-bold">79 bpm</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>Average O2 Saturation</span>
                  <span className="font-bold">97.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Patient Vitals Trends
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Alert Frequency Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Vital Signs Compliance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Weekly Monitoring Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vitals;