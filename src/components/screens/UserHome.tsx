
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Clock, Bell, Shield } from "lucide-react";
import ServiceCard, { ServiceInfo } from '../ui-elements/ServiceCard';
import GlassmorphicCard from '../ui-elements/GlassmorphicCard';
import { useAuth } from '@/context/AuthContext';
import { useStaggeredAnimation } from '@/utils/animations';

// Mock service data
const popularServices: ServiceInfo[] = [
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
  {
    id: '3',
    title: 'House Cleaning',
    category: 'Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.9,
    price: 200,
    providerName: 'CleanPro Services',
    estimatedTime: '2-3 hours',
    distance: '1.5 km',
    isPopular: true
  },
  {
    id: '4',
    title: 'Furniture Assembly',
    category: 'Carpentry',
    imageUrl: 'https://images.unsplash.com/photo-1631205767531-2976080f0f53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80',
    rating: 4.6,
    price: 180,
    providerName: 'Assembly Experts',
    estimatedTime: '1-2 hours',
    distance: '4.2 km'
  }
];

const nearbyServices: ServiceInfo[] = [
  {
    id: '5',
    title: 'Lawn Mowing Service',
    category: 'Gardening',
    imageUrl: 'https://images.unsplash.com/photo-1564944970217-0b5a90c73a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    rating: 4.5,
    price: 150,
    providerName: 'Green Thumb Gardening',
    estimatedTime: '1-2 hours',
    distance: '0.8 km'
  },
  {
    id: '6',
    title: 'AC Repair & Service',
    category: 'Appliance Repair',
    imageUrl: 'https://images.unsplash.com/photo-1499493602564-0dafd836ee6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    rating: 4.7,
    price: 320,
    providerName: 'Cool Air Technicians',
    estimatedTime: '1-3 hours',
    distance: '1.1 km',
    isPopular: true
  },
  {
    id: '7',
    title: 'TV Mounting',
    category: 'Home Improvement',
    imageUrl: 'https://images.unsplash.com/photo-1581092446287-7d13eebd952c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
    price: 120,
    providerName: 'Tech Installers',
    estimatedTime: '30-60 min',
    distance: '1.4 km',
  }
];

// Categories data
const categories = [
  { name: 'Plumbing', icon: '🔧' },
  { name: 'Electrical', icon: '⚡' },
  { name: 'Cleaning', icon: '🧹' },
  { name: 'Carpentry', icon: '🪚' },
  { name: 'Painting', icon: '🖌️' },
  { name: 'Gardening', icon: '🌱' },
  { name: 'Moving', icon: '📦' },
  { name: 'Appliance', icon: '🔌' }
];

const UserHome: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const popularVisibleIndices = useStaggeredAnimation(popularServices.length, 100);
  const nearbyVisibleIndices = useStaggeredAnimation(nearbyServices.length, 100);

  return (
    <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Hi, {user?.name || 'there'}!
        </h1>
        <p className="text-muted-foreground">What service do you need today?</p>
      </div>
      
      {/* Search Box */}
      <Card className="mb-8 border-0 shadow-subtle overflow-hidden">
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search for services..."
              className="pl-10 py-6 bg-background border-0 focus-visible:ring-handyhub-400"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Emergency SOS Button */}
      <GlassmorphicCard
        className="mb-8 cursor-pointer"
        variant="strong"
        withHover
        withBorder
      >
        <div className="flex items-center gap-6">
          <div className="bg-red-500 h-12 w-12 rounded-full flex items-center justify-center">
            <Bell className="text-white animate-pulse" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Emergency SOS</h3>
            <p className="text-sm text-muted-foreground">
              Tap for immediate assistance with urgent issues
            </p>
          </div>
        </div>
      </GlassmorphicCard>
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-subtle transition-shadow border border-gray-100">
              <CardContent className="p-3 flex flex-col items-center text-center">
                <div className="text-2xl mb-1">{category.icon}</div>
                <span className="text-xs">{category.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Services Tabs */}
      <div className="mb-6">
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="popular" className="flex-1">Popular</TabsTrigger>
            <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
            <TabsTrigger value="new" className="flex-1">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="space-y-4">
            {popularServices.map((service, index) => (
              popularVisibleIndices.includes(index) && (
                <div key={service.id} className="animate-fade-in">
                  <ServiceCard service={service} />
                </div>
              )
            ))}
          </TabsContent>
          
          <TabsContent value="nearby" className="space-y-4">
            {nearbyServices.map((service, index) => (
              nearbyVisibleIndices.includes(index) && (
                <div key={service.id} className="animate-fade-in">
                  <ServiceCard service={service} />
                </div>
              )
            ))}
          </TabsContent>
          
          <TabsContent value="new" className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-muted-foreground">New services will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-handyhub-50 to-white">
          <div className="flex items-start gap-3">
            <div className="bg-handyhub-100 rounded-full p-2">
              <MapPin className="text-handyhub-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Local Providers</h3>
              <p className="text-sm text-muted-foreground">Connect with trusted local services</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-handyhub-50 to-white">
          <div className="flex items-start gap-3">
            <div className="bg-handyhub-100 rounded-full p-2">
              <Clock className="text-handyhub-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Quick Response</h3>
              <p className="text-sm text-muted-foreground">Get help within minutes</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-handyhub-50 to-white">
          <div className="flex items-start gap-3">
            <div className="bg-handyhub-100 rounded-full p-2">
              <Shield className="text-handyhub-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Safe & transparent transactions</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserHome;
