
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, Star, MessageSquare, Calendar, Clock, 
  MapPin, Phone, Check, Shield, Award, ThumbsUp 
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthContext';
import { ServiceInfo } from '@/components/ui-elements/ServiceCard';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';

// Mock data - in a real app, this would come from an API
const providerServices: ServiceInfo[] = [
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
    id: '4',
    title: 'Pipe Repairs',
    category: 'Plumbing',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    rating: 4.9,
    price: 280,
    providerName: 'Mike\'s Plumbing',
    estimatedTime: '1-2 hours',
    distance: '2.3 km'
  },
];

const reviews = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    date: '2023-05-15',
    comment: 'Mike did an excellent job fixing our leaky faucet. He was prompt, professional, and very knowledgeable. Would definitely recommend!',
    serviceTitle: 'Pipe Repairs',
  },
  {
    id: '2',
    name: 'James Wilson',
    rating: 4,
    date: '2023-04-22',
    comment: 'Quick response to our emergency plumbing issue. Arrived within an hour and fixed the problem efficiently.',
    serviceTitle: 'Emergency Plumbing',
  },
  {
    id: '3',
    name: 'Emily Davis',
    rating: 5,
    date: '2023-03-11',
    comment: 'Very professional service. Mike explained everything clearly and did a great job installing our new sink.',
    serviceTitle: 'Sink Installation',
  },
];

const ServiceProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [contactMessage, setContactMessage] = useState('');
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent to provider");
    setContactMessage('');
  };
  
  const handleBookService = (serviceId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to book a service");
      navigate('/auth');
      return;
    }
    
    navigate(`/booking/${serviceId}`);
  };
  
  return (
    <AuthProvider>
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/3">
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                    alt="Provider" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-1">Mike's Plumbing</h1>
                <div className="flex items-center justify-center mb-2">
                  <Star className="text-yellow-400 h-5 w-5" />
                  <span className="ml-1 font-medium">4.8</span>
                  <span className="text-muted-foreground ml-1">(52 reviews)</span>
                </div>
                <Badge className="mb-4">Verified Provider</Badge>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <Badge variant="outline">Plumbing</Badge>
                  <Badge variant="outline">Water Heaters</Badge>
                  <Badge variant="outline">Pipe Repairs</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button 
                    variant="outline"
                    className="flex items-center"
                    onClick={() => toast.info("Calling provider...")}
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call
                  </Button>
                  <Button 
                    className="flex items-center"
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="border-0 shadow-md mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Provider Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">Cape Town, South Africa</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Working Hours</h3>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 8am-6pm</p>
                    <p className="text-sm text-muted-foreground">Sat: 9am-3pm</p>
                    <p className="text-sm text-muted-foreground">Emergency: 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Verification</h3>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" /> ID Verified
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" /> License Verified
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" /> Background Check
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full mb-6 grid grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">About Mike's Plumbing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Mike's Plumbing has been providing exceptional plumbing services to Cape Town and surrounding areas since 2010. With over 13 years of experience, we specialize in emergency repairs, installations, and maintenance of all plumbing systems.
                    </p>
                    <p className="mb-4">
                      Our team consists of licensed and experienced plumbers who are dedicated to delivering high-quality workmanship and excellent customer service. We pride ourselves on being prompt, reliable, and thorough in all our work.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <Award className="text-primary h-5 w-5" />
                        <span className="text-sm">10+ Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-primary h-5 w-5" />
                        <span className="text-sm">Licensed & Insured</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="text-primary h-5 w-5" />
                        <span className="text-sm">100% Satisfaction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="text-primary h-5 w-5" />
                        <span className="text-sm">Same-Day Service</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications & Awards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Award className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">Master Plumber License</h3>
                          <p className="text-sm text-muted-foreground">Certified by National Plumbing Association</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Award className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">Best Service Provider 2022</h3>
                          <p className="text-sm text-muted-foreground">Cape Town Business Excellence Awards</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md" id="contact-form">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Mike's Plumbing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Write your message here..."
                          className="min-h-[120px]"
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
                
                {providerServices.map((service) => (
                  <GlassmorphicCard key={service.id} withHover>
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/4 h-32 rounded-lg overflow-hidden">
                          <img 
                            src={service.imageUrl} 
                            alt={service.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-1">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{service.category}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm mb-3">
                            <div className="flex items-center">
                              <Star className="text-yellow-400 h-4 w-4 mr-1" />
                              <span>{service.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="text-muted-foreground h-4 w-4 mr-1" />
                              <span>{service.estimatedTime}</span>
                            </div>
                            <div className="font-medium">
                              R{service.price}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {service.isEmergency && (
                              <Badge variant="destructive">Emergency Service</Badge>
                            )}
                            {service.isPopular && (
                              <Badge variant="secondary">Popular</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-end">
                          <Button onClick={() => handleBookService(service.id)}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassmorphicCard>
                ))}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Client Reviews</h2>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 h-5 w-5 mr-1" />
                    <span className="font-medium mr-1">4.8</span>
                    <span className="text-muted-foreground">(52 reviews)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-2 mb-6">
                  <div className="text-center">
                    <div className="font-medium">5 ★</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full" style={{ width: '80%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">42</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">4 ★</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full" style={{ width: '15%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">8</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">3 ★</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full" style={{ width: '5%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">2</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">2 ★</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full" style={{ width: '0%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">0</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">1 ★</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full" style={{ width: '0%' }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">0</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{review.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} 
                                fill={i < review.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-2">{review.serviceTitle}</Badge>
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default ServiceProviderProfile;
