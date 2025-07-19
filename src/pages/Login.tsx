import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Heart, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Suggested test users based on roles
const testUsers = [
  { email: 'admin@doors.health', password: 'admin123', role: 'System Administrator', hospital: 'DOORS Central' },
  { email: 'doctor@kenyatta.ke', password: 'doctor123', role: 'Doctor', hospital: 'Kenyatta Hospital' },
  { email: 'nurse@muhimbili.tz', password: 'nurse123', role: 'Nurse', hospital: 'Muhimbili Hospital' },
  { email: 'pharmacy@korle.gh', password: 'pharmacy123', role: 'Pharmacist', hospital: 'Korle-Bu Hospital' },
  { email: 'manager@chris.za', password: 'manager123', role: 'Hospital Manager', hospital: 'Chris Hani Hospital' }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const user = testUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('doors_user', JSON.stringify(user));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.role}!`,
        });
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try one of the test accounts.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-primary p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">DOORS Health</h1>
          <p className="text-muted-foreground">African Healthcare Network</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-primary" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Users */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-sm">Test Users (Demo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {testUsers.map((user, index) => (
              <div key={index} className="p-2 bg-muted rounded-lg text-xs">
                <div className="font-medium">{user.role} - {user.hospital}</div>
                <div className="text-muted-foreground">{user.email} / {user.password}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;