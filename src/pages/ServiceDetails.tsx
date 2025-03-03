
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, ArrowLeft, MessageSquare, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthContext';
import { ServiceInfo } from '@/components/ui-elements/ServiceCard';

// Mock data - in a real app, this would come from an API
const services: ServiceInfo[] = [
  {
    id: '1',
    title: 'Emergency Plumbing',
    category: 'Plumbing',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
    price: 350,
    providerName: 'Mike\'s Plumbing',
    estimatedTime: '30-60 min',
    distance: '2.3 km',
    isEmergency: true,
    description: 'Emergency plumbing services for urgent water leaks, pipe bursts, or blockages. Available 24/7 with quick response times.'
  },
  {
    id: '2',
    title: 'Electrical Repairs',
    category: 'Electrical',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
    rating: 4.7,
    price: 280,
    providerName: 'Volt Masters',
    estimatedTime: '1-2 hours',
    distance: '3.1 km',
    isPopular: true,
    description: 'Professional electrical repair services for homes and businesses. We fix electrical faults, install new fixtures, and ensure your electrical systems are safe and up to code.'
  },
  // ... more services
];

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [service, setService] = useState<ServiceInfo | null>(null);
  
  useEffect(() => {
    // In a real app, fetch from API
    const foundService = services.find(s => s.id === id);
    if (foundService) {
      setService(foundService);
    }
  }, [id]);
  
  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book this service");
      navigate('/auth');
      return;
    }
    
    navigate(`/booking/${id}`);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleViewProviderProfile = () => {
    navigate(`/provider-profile/${id}`);
  };
  
  if (!service) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading service details...</p>
      </div>
    );
  }
  
  return (
    <AuthProvider>
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="relative mb-6 h-64 md:h-80 rounded-lg overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            {service.isEmergency && (
              <Badge variant="destructive" className="mb-2">Emergency Service</Badge>
            )}
            {service.isPopular && (
              <Badge variant="secondary" className="mb-2">Popular Service</Badge>
            )}
            <h1 className="text-2xl font-bold mb-1">{service.title}</h1>
            <p className="text-white/80">{service.category}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{service.description || 'No description available.'}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground" size={18} />
                  <span>{service.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-muted-foreground" size={18} />
                  <span>{service.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" size={18} />
                  <span>{service.rating} Rating</span>
                </div>
                <div className="font-medium">
                  R{service.price} per hour
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">What's included:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Initial diagnosis</li>
                  <li>Standard parts and materials</li>
                  <li>Professional service</li>
                  <li>30-day service guarantee</li>
                </ul>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                      alt="Provider" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-lg">{service.providerName}</h3>
                  <div className="flex items-center justify-center mt-1">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1">{service.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Active since 2019</p>
                  
                  <div className="flex gap-2 mt-4 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => toast.info("Chat feature coming soon!")}
                    >
                      <MessageSquare size={16} className="mr-1" /> Chat
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                      onClick={handleViewProviderProfile}
                    >
                      Profile <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about this service? Our support team is ready to assist you.
                </p>
                <Button variant="outline" className="w-full" onClick={() => toast.info("Support feature coming soon!")}>
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default ServiceDetails;
