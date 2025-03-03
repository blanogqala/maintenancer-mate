
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, ArrowLeft, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthContext';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';

const emergencyServices = [
  { id: 'plumbing', name: 'Plumbing Emergency', icon: '🔧' },
  { id: 'electrical', name: 'Electrical Emergency', icon: '⚡' },
  { id: 'locksmith', name: 'Locksmith', icon: '🔑' },
  { id: 'gas', name: 'Gas Leak', icon: '🔥' },
  { id: 'security', name: 'Security Breach', icon: '🚨' },
  { id: 'medical', name: 'Medical Emergency', icon: '🚑' },
];

const EmergencySOS = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [emergencyLocation, setEmergencyLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emergencyStatus, setEmergencyStatus] = useState<'initial' | 'searching' | 'found' | 'dispatched'>('initial');
  const [providerETA, setProviderETA] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to use the Emergency SOS feature");
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  const handleEmergencyRequest = () => {
    if (!selectedService) {
      toast.error("Please select an emergency type");
      return;
    }
    
    if (!emergencyLocation) {
      toast.error("Please enter your location");
      return;
    }
    
    if (!contactNumber) {
      toast.error("Please enter your contact number");
      return;
    }
    
    setIsSubmitting(true);
    setEmergencyStatus('searching');
    
    // Simulate finding a provider
    setTimeout(() => {
      setEmergencyStatus('found');
      
      // Simulate provider acceptance
      setTimeout(() => {
        setEmergencyStatus('dispatched');
        setProviderETA('15-20 minutes');
        setIsSubmitting(false);
        
        toast.success("Emergency service provider dispatched to your location");
      }, 3000);
    }, 3000);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <AuthProvider>
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6 max-w-2xl">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-red-100 p-3 rounded-full mb-3">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Emergency SOS</h1>
          <p className="text-muted-foreground">
            Get immediate assistance for urgent home emergencies
          </p>
        </div>
        
        {emergencyStatus === 'initial' && (
          <Card className="border border-red-200 shadow-lg mb-6">
            <CardContent className="p-6">
              <Tabs defaultValue="emergency" className="w-full">
                <TabsList className="w-full mb-4 grid grid-cols-2">
                  <TabsTrigger value="emergency">Emergency SOS</TabsTrigger>
                  <TabsTrigger value="emergency-contacts">Important Contacts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="emergency" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Type of Emergency</Label>
                      <RadioGroup 
                        value={selectedService || ''} 
                        onValueChange={setSelectedService}
                        className="grid grid-cols-2 gap-3"
                      >
                        {emergencyServices.map((service) => (
                          <div 
                            key={service.id}
                            className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-red-50 transition-colors"
                          >
                            <RadioGroupItem value={service.id} id={service.id} />
                            <Label htmlFor={service.id} className="flex items-center cursor-pointer">
                              <span className="mr-2">{service.icon}</span> {service.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location</Label>
                      <div className="flex gap-2">
                        <Input
                          id="location"
                          placeholder="Enter your address"
                          value={emergencyLocation}
                          onChange={(e) => setEmergencyLocation(e.target.value)}
                          className="flex-1"
                          required
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setEmergencyLocation('Current Location');
                            toast.info("Using your current location");
                          }}
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="Your contact number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      size="lg"
                      onClick={handleEmergencyRequest}
                      disabled={isSubmitting}
                    >
                      Request Emergency Service
                    </Button>
                    
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      For life-threatening emergencies, please call 911 directly
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="emergency-contacts" className="space-y-4">
                  <div className="space-y-4">
                    <GlassmorphicCard>
                      <div className="flex items-center gap-3 p-3">
                        <div className="bg-red-100 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">National Emergency</h3>
                          <p className="text-sm text-muted-foreground">911</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-auto"
                          onClick={() => toast.info("Calling 911...")}
                        >
                          Call
                        </Button>
                      </div>
                    </GlassmorphicCard>
                    
                    <GlassmorphicCard>
                      <div className="flex items-center gap-3 p-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Police Department</h3>
                          <p className="text-sm text-muted-foreground">+123-456-7890</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-auto"
                          onClick={() => toast.info("Calling Police Department...")}
                        >
                          Call
                        </Button>
                      </div>
                    </GlassmorphicCard>
                    
                    <GlassmorphicCard>
                      <div className="flex items-center gap-3 p-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Fire Department</h3>
                          <p className="text-sm text-muted-foreground">+123-456-7891</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-auto"
                          onClick={() => toast.info("Calling Fire Department...")}
                        >
                          Call
                        </Button>
                      </div>
                    </GlassmorphicCard>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
        
        {emergencyStatus === 'searching' && (
          <Card className="border-0 shadow-lg mb-6 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="animate-pulse bg-red-100 p-4 rounded-full mb-3">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Searching for Available Providers</h2>
              <p className="text-center text-muted-foreground mb-4">
                We're locating the closest service provider for your {selectedService} emergency
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div className="bg-red-600 h-full animate-progress"></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Estimated wait time: 1-2 minutes
              </p>
            </CardContent>
          </Card>
        )}
        
        {emergencyStatus === 'found' && (
          <Card className="border-0 shadow-lg mb-6 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-3">
                <AlertTriangle className="h-10 w-10 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Provider Found</h2>
              <p className="text-center text-muted-foreground mb-4">
                We've located an emergency service provider for you
              </p>
              <div className="w-full bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                      alt="Provider" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">John Smith</h3>
                    <p className="text-sm text-muted-foreground">Emergency Plumber</p>
                  </div>
                </div>
                <p className="text-sm text-center animate-pulse font-medium text-yellow-600">
                  Provider is reviewing your request...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {emergencyStatus === 'dispatched' && (
          <Card className="border-0 shadow-lg mb-6 overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-3">
                <MapPin className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Help is on the way!</h2>
              <p className="text-center text-muted-foreground mb-4">
                Your emergency service provider is on their way to your location
              </p>
              <div className="w-full bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                      alt="Provider" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">John Smith</h3>
                    <p className="text-sm text-muted-foreground">Emergency Plumber</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => toast.info("Calling provider...")}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-center mt-2">
                  <p className="font-medium">Estimated arrival time: {providerETA}</p>
                  <p className="text-muted-foreground mt-1">
                    Vehicle: White Van (License: ABC-1234)
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setEmergencyStatus('initial');
                  setSelectedService(null);
                  setEmergencyLocation('');
                  setContactNumber('');
                  setProviderETA(null);
                }}
              >
                Cancel Emergency Request
              </Button>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-4">
          <h3 className="font-medium mb-3">Emergency Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="bg-red-100 p-1 rounded-full text-red-600 mt-0.5">•</div>
              <p className="text-sm">For water leaks, locate and shut off the main water valve</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-red-100 p-1 rounded-full text-red-600 mt-0.5">•</div>
              <p className="text-sm">For electrical issues, switch off the main circuit breaker</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-red-100 p-1 rounded-full text-red-600 mt-0.5">•</div>
              <p className="text-sm">For gas leaks, evacuate immediately and call emergency services</p>
            </li>
          </ul>
        </div>
      </div>
    </AuthProvider>
  );
};

export default EmergencySOS;
