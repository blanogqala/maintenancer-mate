
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ServiceDetails from "./pages/ServiceDetails";
import BookingPage from "./pages/BookingPage";
import EmergencySOS from "./pages/EmergencySOS";
import ServiceProviderProfile from "./pages/ServiceProviderProfile";
import CategoryProviders from "./pages/CategoryProviders";

// Initialize Capacitor if available
const setupCapacitor = async () => {
  if (window.Capacitor) {
    try {
      // Apply mobile-specific configurations
      if (window.Capacitor.Plugins && window.Capacitor.Plugins.StatusBar) {
        window.Capacitor.Plugins.StatusBar.setBackgroundColor({ color: '#0e95e9' });
      }
      
      // We're not using KeepAwake due to installation issues
      console.log('Capacitor initialized successfully');
    } catch (error) {
      console.error('Error initializing Capacitor:', error);
    }
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize Capacitor when component mounts
    setupCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/provider" element={<ProviderDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/emergency" element={<EmergencySOS />} />
              <Route path="/provider-profile/:id" element={<ServiceProviderProfile />} />
              <Route path="/category/:categoryId" element={<CategoryProviders />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
