
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CreditCard, History, Settings, LogOut } from "lucide-react";
import { AuthProvider } from '@/context/AuthContext';
import { toast } from "sonner";

const Profile = () => {
  const { user, isAuthenticated, userType, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  const saveProfile = () => {
    // In a real app, this would update the user profile in the database
    toast.success("Profile updated successfully");
  };
  
  const handleLogout = () => {
    logout();
  };

  return (
    <AuthProvider>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-md border-0">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
                <p className="text-muted-foreground">{userType === 'customer' ? 'Customer' : 'Service Provider'}</p>
              </div>
            </div>
          </CardHeader>
          
          <Tabs defaultValue="personal" className="p-6">
            <TabsList className="grid grid-cols-4 gap-4 mb-8">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User size={16} />
                <span>Personal Details</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard size={16} />
                <span>Payment Options</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History size={16} />
                <span>Service History</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={16} />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your full name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Your email address" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Your location" />
                </div>
                
                {userType === 'provider' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio/Description</Label>
                      <textarea 
                        id="bio" 
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                        placeholder="Tell clients about yourself and your services" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills/Services</Label>
                      <Input id="skills" placeholder="e.g., Plumbing, Electrical" />
                    </div>
                  </>
                )}
              </div>
              
              <Button className="mt-6" onClick={saveProfile}>Save Changes</Button>
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-primary" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">+ Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Recent Services</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">Plumbing Repair</h4>
                        <span className="text-green-600 font-medium">Completed</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Service provider: John Doe</p>
                      <p className="text-sm text-muted-foreground">Date: May 15, 2023</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">Electrical Installation</h4>
                        <span className="text-blue-600 font-medium">Scheduled</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Service provider: Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Date: June 10, 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">App Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                      </div>
                      <div className="flex items-center h-8">
                        <Button variant="outline" size="sm">Light</Button>
                        <Button variant="outline" size="sm">Dark</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-muted-foreground">Configure notification preferences</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <Button variant="destructive" className="flex items-center gap-2" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </AuthProvider>
  );
};

export default Profile;
