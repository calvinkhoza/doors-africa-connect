import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Referrals from "./pages/Referrals";
import BedManagement from "./pages/BedManagement";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";
import Pharmacy from "./pages/Pharmacy";
import Vitals from "./pages/Vitals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Authentication check component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('doors_user');
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Index />} />
            <Route path="patients" element={<Patients />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="beds" element={<BedManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="vitals" element={<Vitals />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
