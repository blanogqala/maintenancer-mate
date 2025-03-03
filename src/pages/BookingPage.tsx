
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon, Clock, CreditCard, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthContext';
import { ServiceInfo } from '@/components/ui-elements/ServiceCard';
import { cn } from '@/lib/utils';

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
    isEmergency: true
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
    isPopular: true
  },
  // ... more services
];

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
  '04:00 PM', '05:00 PM', '06:00 PM'
];

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [service, setService] = useState<ServiceInfo | null>(null);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [issue, setIssue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to book a service");
      navigate('/auth');
      return;
    }
    
    // In a real app, fetch from API
    const foundService = services.find(s => s.id === id);
    if (foundService) {
      setService(foundService);
    }
  }, [id, isAuthenticated, navigate]);
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };
  
  const handleNext = () => {
    if (step === 1) {
      if (!date || !selectedTimeSlot) {
        toast.error("Please select both date and time");
        return;
      }
    } else if (step === 2) {
      if (!address) {
        toast.error("Please enter your address");
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  const handleConfirmBooking = () => {
    // In a real app, this would make an API call to create the booking
    toast.success("Booking confirmed! Your service is scheduled.");
    
    // Redirect to user dashboard
    setTimeout(() => {
      navigate('/user');
    }, 2000);
  };
  
  if (!service) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading booking details...</p>
      </div>
    );
  }
  
  return (
    <AuthProvider>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> {step > 1 ? 'Back' : 'Cancel'}
        </Button>
        
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center justify-between">
              <span>Book {service.title}</span>
              <span className="text-sm font-normal text-muted-foreground">Step {step} of 3</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
                  
                  <div className="mb-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Available Time Slots</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTimeSlot === time ? "default" : "outline"}
                          className="flex items-center justify-center"
                          onClick={() => setSelectedTimeSlot(time)}
                        >
                          <Clock className="mr-1 h-4 w-4" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Service Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Provider:</div>
                    <div className="font-medium">{service.providerName}</div>
                    <div>Estimated Duration:</div>
                    <div className="font-medium">{service.estimatedTime}</div>
                    <div>Rate:</div>
                    <div className="font-medium">R{service.price} per hour</div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Service Location & Details</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Service Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter the address where service is needed"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="issue">Describe the Issue</Label>
                      <Textarea
                        id="issue"
                        placeholder="Please describe the issue in detail to help the service provider"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Service:</div>
                    <div className="font-medium">{service.title}</div>
                    <div>Date & Time:</div>
                    <div className="font-medium">
                      {date ? format(date, "PPP") : "Not selected"} at {selectedTimeSlot || "Not selected"}
                    </div>
                    <div>Provider:</div>
                    <div className="font-medium">{service.providerName}</div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 flex items-center cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">Pay Cash on Service</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Booking Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>Service:</div>
                    <div className="font-medium">{service.title}</div>
                    <div>Date & Time:</div>
                    <div className="font-medium">
                      {date ? format(date, "PPP") : "Not selected"} at {selectedTimeSlot || "Not selected"}
                    </div>
                    <div>Provider:</div>
                    <div className="font-medium">{service.providerName}</div>
                    <div>Address:</div>
                    <div className="font-medium">{address}</div>
                    <div>Payment Method:</div>
                    <div className="font-medium">{paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Service'}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Service Rate (per hour):</span>
                      <span>R{service.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Estimated Duration:</span>
                      <span>{service.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Service Fee:</span>
                      <span>R50</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>R{service.price + 50}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="border-t p-6 flex gap-3">
            {step < 3 ? (
              <Button onClick={handleNext} className="w-full">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleConfirmBooking} className="w-full">
                Confirm Booking
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </AuthProvider>
  );
};

export default BookingPage;
