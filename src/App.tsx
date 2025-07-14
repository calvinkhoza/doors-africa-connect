import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Referrals from "./pages/Referrals";
import BedManagement from "./pages/BedManagement";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="patients" element={<Patients />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="beds" element={<BedManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="pharmacy" element={<div className="p-8 text-center text-muted-foreground">Pharmacy - Coming Soon</div>} />
            <Route path="vitals" element={<div className="p-8 text-center text-muted-foreground">Vitals - Coming Soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
