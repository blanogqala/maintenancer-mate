
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign, MapPin, MessageSquare, Star, Briefcase, TrendingUp } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import GlassmorphicCard from '../ui-elements/GlassmorphicCard';
import { useStaggeredAnimation } from '@/utils/animations';

// Mock jobs data
const upcomingJobs = [
  {
    id: '1',
    title: 'Fix Leaking Sink',
    client: 'John Doe',
    address: '123 Main St, Cape Town',
    time: '1 Apr, 09:00 - 10:30 AM',
    price: 350,
    distance: '3.2 km'
  },
  {
    id: '2',
    title: 'Repair Electrical Socket',
    client: 'Sarah Johnson',
    address: '456 Park Ave, Cape Town',
    time: '1 Apr, 1:00 - 2:00 PM',
    price: 280,
    distance: '5.7 km'
  },
  {
    id: '3',
    title: 'Install Bathroom Fixtures',
    client: 'Michael Brown',
    address: '789 Oak St, Cape Town',
    time: '2 Apr, 10:00 - 12:00 PM',
    price: 500,
    distance: '4.1 km'
  }
];

const pendingRequests = [
  {
    id: '4',
    title: 'Replace Kitchen Faucet',
    client: 'Emily Davis',
    address: '101 Pine St, Cape Town',
    requestTime: '30 minutes ago',
    price: 280,
    distance: '2.8 km',
    urgency: 'Low'
  },
  {
    id: '5',
    title: 'Fix Bathroom Drain',
    client: 'David Wilson',
    address: '202 Cedar Rd, Cape Town',
    requestTime: '1 hour ago',
    price: 320,
    distance: '3.5 km',
    urgency: 'Medium'
  },
  {
    id: '6',
    title: 'Emergency Water Heater Repair',
    client: 'Lisa Thompson',
    address: '303 Elm Blvd, Cape Town',
    requestTime: '15 minutes ago',
    price: 450,
    distance: '1.2 km',
    urgency: 'High'
  }
];

const ProviderHome: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const upcomingVisibleIndices = useStaggeredAnimation(upcomingJobs.length, 100);
  const pendingVisibleIndices = useStaggeredAnimation(pendingRequests.length, 100);
  
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'Medium':
        return <Badge variant="default" className="bg-amber-500">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome Back, {user?.name.split(' ')[0] || 'Provider'}
        </h1>
        <p className="text-muted-foreground">Here's your dashboard for today</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 appear-from-bottom">
        <Card className="border-0 shadow-subtle">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <DollarSign className="text-handyhub-500 mb-2" size={20} />
            <p className="text-sm mb-1">Today's earnings</p>
            <h3 className="text-lg font-bold">ZAR 1,250</h3>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-subtle">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Briefcase className="text-handyhub-500 mb-2" size={20} />
            <p className="text-sm mb-1">Jobs today</p>
            <h3 className="text-lg font-bold">3</h3>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-subtle">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Star className="text-handyhub-500 mb-2" size={20} />
            <p className="text-sm mb-1">Your rating</p>
            <h3 className="text-lg font-bold">4.8/5</h3>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-subtle">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <TrendingUp className="text-handyhub-500 mb-2" size={20} />
            <p className="text-sm mb-1">Completion rate</p>
            <h3 className="text-lg font-bold">97%</h3>
          </CardContent>
        </Card>
      </div>
      
      {/* Available Now Toggle */}
      <GlassmorphicCard
        className="mb-8 cursor-pointer"
        variant="strong"
        withHover
        withBorder
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center">
              <div className="h-6 w-6 bg-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold">You're Available</h3>
              <p className="text-sm text-muted-foreground">
                Accepting new job requests
              </p>
            </div>
          </div>
          <Button variant="outline" className="border-gray-200">
            Go Offline
          </Button>
        </div>
      </GlassmorphicCard>
      
      {/* Jobs Tabs */}
      <div className="mb-6">
        <Tabs 
          defaultValue="upcoming" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming Jobs</TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">Pending Requests (3)</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingJobs.length > 0 ? (
              <div className="space-y-4">
                {upcomingJobs.map((job, index) => (
                  upcomingVisibleIndices.includes(index) && (
                    <Card key={job.id} className="overflow-hidden border-0 shadow-subtle animate-fade-in">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <span className="font-semibold text-handyhub-700">ZAR {job.price}</span>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{job.time}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{job.address} ({job.distance})</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>Client: {job.client}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex border-t border-gray-100">
                          <Button variant="ghost" className="flex-1 rounded-none h-12">
                            View Details
                          </Button>
                          <div className="w-px bg-gray-100"></div>
                          <Button variant="ghost" className="flex-1 rounded-none h-12">
                            Get Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Calendar className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">No upcoming jobs scheduled</p>
                <Button variant="outline" className="mt-4">
                  View Calendar
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending">
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request, index) => (
                  pendingVisibleIndices.includes(index) && (
                    <Card key={request.id} className="overflow-hidden border-0 shadow-subtle animate-fade-in">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{request.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-muted-foreground">Requested {request.requestTime}</p>
                                {getUrgencyBadge(request.urgency)}
                              </div>
                            </div>
                            <span className="font-semibold text-handyhub-700">ZAR {request.price}</span>
                          </div>
                          
                          <div className="space-y-2 text-sm mt-4">
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{request.address} ({request.distance})</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>Client: {request.client}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex border-t border-gray-100">
                          <Button variant="ghost" className="flex-1 rounded-none h-12 text-red-500 hover:text-red-700 hover:bg-red-50">
                            Decline
                          </Button>
                          <div className="w-px bg-gray-100"></div>
                          <Button variant="ghost" className="flex-1 rounded-none h-12 text-green-600 hover:text-green-700 hover:bg-green-50">
                            Accept
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No pending requests</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-muted-foreground">Your completed jobs will appear here</p>
              <Button variant="outline" className="mt-4">
                View History
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-14 justify-start px-4">
            <Calendar className="mr-2 h-5 w-5" />
            <span>Manage Schedule</span>
          </Button>
          <Button variant="outline" className="h-14 justify-start px-4">
            <MessageSquare className="mr-2 h-5 w-5" />
            <span>Messages</span>
          </Button>
          <Button variant="outline" className="h-14 justify-start px-4">
            <DollarSign className="mr-2 h-5 w-5" />
            <span>Earnings & Payouts</span>
          </Button>
          <Button variant="outline" className="h-14 justify-start px-4">
            <MapPin className="mr-2 h-5 w-5" />
            <span>Service Areas</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderHome;
