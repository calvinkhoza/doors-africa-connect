import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bed, Eye, MapPin } from 'lucide-react';

const bedData = [
  {
    ward: 'Emergency Ward',
    total: 24,
    available: 6,
    occupied: 15,
    maintenance: 2,
    reserved: 1,
    occupancyRate: 75
  },
  {
    ward: 'General Medicine',
    total: 48,
    available: 12,
    occupied: 32,
    maintenance: 3,
    reserved: 1,
    occupancyRate: 67
  },
  {
    ward: 'Pediatrics',
    total: 20,
    available: 5,
    occupied: 14,
    maintenance: 1,
    reserved: 0,
    occupancyRate: 70
  },
  {
    ward: 'ICU',
    total: 12,
    available: 2,
    occupied: 9,
    maintenance: 0,
    reserved: 1,
    occupancyRate: 83
  },
  {
    ward: 'Maternity',
    total: 16,
    available: 7,
    occupied: 8,
    maintenance: 1,
    reserved: 0,
    occupancyRate: 50
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-bed-available';
    case 'occupied': return 'bg-bed-occupied';
    case 'maintenance': return 'bg-bed-maintenance';
    case 'reserved': return 'bg-bed-reserved';
    default: return 'bg-muted';
  }
};

export const BedStatusCard = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bed className="h-5 w-5" />
            <span>Bed Availability Overview</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            View Floor Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 p-3 bg-secondary rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-bed-available"></div>
            <span className="text-sm text-secondary-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-bed-occupied"></div>
            <span className="text-sm text-secondary-foreground">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-bed-maintenance"></div>
            <span className="text-sm text-secondary-foreground">Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-bed-reserved"></div>
            <span className="text-sm text-secondary-foreground">Reserved</span>
          </div>
        </div>

        {/* Ward List */}
        <div className="space-y-4">
          {bedData.map((ward) => (
            <div key={ward.ward} className="border border-border rounded-lg p-4 hover:shadow-card transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">{ward.ward}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {ward.occupancyRate}% occupied
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-bed-available">{ward.available}</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-bed-occupied">{ward.occupied}</div>
                  <div className="text-xs text-muted-foreground">Occupied</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-bed-maintenance">{ward.maintenance}</div>
                  <div className="text-xs text-muted-foreground">Maintenance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-bed-reserved">{ward.reserved}</div>
                  <div className="text-xs text-muted-foreground">Reserved</div>
                </div>
              </div>
              
              <Progress value={ward.occupancyRate} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};