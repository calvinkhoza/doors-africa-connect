import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Bed,
  Activity,
  Filter,
  Search,
  Eye,
  Share
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const reportsData = [
  {
    id: 1,
    title: 'Daily Bed Occupancy Report',
    category: 'Bed Management',
    date: '2024-01-15',
    type: 'automated',
    status: 'completed',
    size: '2.3 MB',
    description: 'Comprehensive bed utilization across all wards',
    metrics: { beds: 234, occupancy: '78%', available: 52 }
  },
  {
    id: 2,
    title: 'Patient Admission Trends',
    category: 'Patient Management',
    date: '2024-01-15',
    type: 'scheduled',
    status: 'completed',
    size: '1.8 MB',
    description: 'Weekly analysis of patient admission patterns',
    metrics: { admissions: 89, discharges: 76, transfers: 12 }
  },
  {
    id: 3,
    title: 'Referral Processing Summary',
    category: 'Referrals',
    date: '2024-01-14',
    type: 'manual',
    status: 'completed',
    size: '1.2 MB',
    description: 'Inter-department referral efficiency report',
    metrics: { referrals: 45, pending: 8, completed: 37 }
  },
  {
    id: 4,
    title: 'Pharmacy Inventory Report',
    category: 'Pharmacy',
    date: '2024-01-14',
    type: 'automated',
    status: 'processing',
    size: '3.1 MB',
    description: 'Current medication stock levels and usage',
    metrics: { medications: 456, lowStock: 23, expired: 5 }
  },
  {
    id: 5,
    title: 'Staff Performance Metrics',
    category: 'Human Resources',
    date: '2024-01-13',
    type: 'scheduled',
    status: 'completed',
    size: '892 KB',
    description: 'Monthly staff productivity and efficiency analysis',
    metrics: { staff: 156, efficiency: '92%', overtime: '15%' }
  }
];

const reportTemplates = [
  {
    id: 'bed-occupancy',
    name: 'Bed Occupancy Report',
    description: 'Detailed bed utilization across all wards',
    icon: Bed,
    category: 'Bed Management',
    frequency: ['Daily', 'Weekly', 'Monthly']
  },
  {
    id: 'patient-analytics',
    name: 'Patient Analytics',
    description: 'Admission, discharge, and transfer statistics',
    icon: Users,
    category: 'Patient Management',
    frequency: ['Daily', 'Weekly', 'Monthly']
  },
  {
    id: 'financial-summary',
    name: 'Financial Summary',
    description: 'Revenue, costs, and billing analysis',
    icon: TrendingUp,
    category: 'Finance',
    frequency: ['Weekly', 'Monthly', 'Quarterly']
  },
  {
    id: 'clinical-outcomes',
    name: 'Clinical Outcomes',
    description: 'Patient outcomes and quality metrics',
    icon: Activity,
    category: 'Clinical',
    frequency: ['Monthly', 'Quarterly']
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-success text-success-foreground';
    case 'processing': return 'bg-warning text-warning-foreground';
    case 'failed': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'automated': return 'bg-primary text-primary-foreground';
    case 'scheduled': return 'bg-accent text-accent-foreground';
    case 'manual': return 'bg-secondary text-secondary-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const ReportForm = ({ template, onGenerate, onClose }: { 
  template?: any, 
  onGenerate: (data: any) => void, 
  onClose: () => void 
}) => {
  const [formData, setFormData] = useState({
    reportType: template?.id || '',
    dateRange: 'last-30-days',
    format: 'pdf',
    includeCharts: true,
    recipients: '',
    frequency: 'once'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="reportType">Report Type</Label>
        <Select value={formData.reportType} onValueChange={(value) => setFormData({ ...formData, reportType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            {reportTemplates.map(template => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="dateRange">Date Range</Label>
        <Select value={formData.dateRange} onValueChange={(value) => setFormData({ ...formData, dateRange: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="format">Format</Label>
          <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">One-time</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="recipients">Email Recipients (optional)</Label>
        <Input
          id="recipients"
          value={formData.recipients}
          onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
          placeholder="email1@domain.com, email2@domain.com"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-primary">
          Generate Report
        </Button>
      </div>
    </form>
  );
};

const Reports = () => {
  const [reports, setReports] = useState(reportsData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleGenerateReport = (reportData: any) => {
    const newReport = {
      id: reports.length + 1,
      title: reportTemplates.find(t => t.id === reportData.reportType)?.name || 'Custom Report',
      category: reportTemplates.find(t => t.id === reportData.reportType)?.category || 'General',
      date: new Date().toISOString().split('T')[0],
      type: reportData.frequency === 'once' ? 'manual' : 'scheduled',
      status: 'processing',
      size: 'Generating...',
      description: reportTemplates.find(t => t.id === reportData.reportType)?.description || 'Custom generated report',
      metrics: { processing: true }
    };
    
    setReports([newReport, ...reports]);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { ...r, status: 'completed', size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`, metrics: { beds: 156, occupancy: '78%', available: 34 } }
          : r
      ));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage healthcare reports</p>
        </div>
        <Dialog open={showGenerateReport} onOpenChange={setShowGenerateReport}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-hover">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            <ReportForm 
              template={selectedTemplate}
              onGenerate={handleGenerateReport} 
              onClose={() => setShowGenerateReport(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Report Templates */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTemplates.map((template) => (
              <div 
                key={template.id}
                className="border border-border rounded-lg p-4 hover:shadow-card transition-all cursor-pointer"
                onClick={() => {
                  setSelectedTemplate(template);
                  setShowGenerateReport(true);
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <template.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{template.name}</h3>
                    <p className="text-xs text-muted-foreground">{template.category}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.frequency.map(freq => (
                    <Badge key={freq} variant="outline" className="text-xs">
                      {freq}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search reports..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Bed Management">Bed Management</SelectItem>
                <SelectItem value="Patient Management">Patient Management</SelectItem>
                <SelectItem value="Referrals">Referrals</SelectItem>
                <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Clinical">Clinical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(report.type)}>
                      {report.type}
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Category</span>
                    <div className="font-medium">{report.category}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Date Generated</span>
                    <div className="font-medium">{report.date}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">File Size</span>
                    <div className="font-medium">{report.size}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Status</span>
                    <div className="capitalize font-medium">{report.status}</div>
                  </div>
                </div>

                {Object.keys(report.metrics).length > 0 && (
                  <div className="bg-secondary rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-foreground mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {Object.entries(report.metrics).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span className="font-medium ml-1">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" className="bg-gradient-primary" disabled={report.status !== 'completed'}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
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

export default Reports;