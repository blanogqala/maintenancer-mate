
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedLogo from '@/components/ui-elements/AnimatedLogo';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import { ArrowRight, Wrench, Shield, Clock, Users } from "lucide-react";
import { AuthProvider, useAuth } from '@/context/AuthContext';
import OnboardingScreen from '@/components/screens/OnboardingScreen';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('handyhub_visited');
    if (!hasVisitedBefore && !isAuthenticated) {
      setShowOnboarding(true);
    }

    // Redirect authenticated users to their respective dashboards
    if (isAuthenticated) {
      if (userType === 'provider') {
        navigate('/provider');
      } else {
        navigate('/user');
      }
    }
  }, [isAuthenticated, userType, navigate]);

  const navigateToAuth = () => {
    navigate('/auth');
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('handyhub_visited', 'true');
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-24">
          <div className="flex flex-col items-center text-center mb-12">
            <AnimatedLogo size="lg" textPosition="bottom" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Home Services <span className="text-primary">Marketplace</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl">
              Connect with trusted service providers for all your home maintenance needs
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-primary hover:bg-primary/90"
                onClick={navigateToAuth}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <GlassmorphicCard>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Wrench size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Providers</h3>
                <p className="text-gray-600">
                  Connect with skilled professionals verified for quality service
                </p>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
                <p className="text-gray-600">
                  Book services with confidence through our secure platform
                </p>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
                <p className="text-gray-600">
                  Quick service from providers for your maintenance needs
                </p>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Ratings</h3>
                <p className="text-gray-600">
                  Choose providers based on genuine user reviews
                </p>
              </div>
            </GlassmorphicCard>
          </div>

          {/* Call To Action */}
          <Card className="mt-20 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-primary/90 to-primary">
            <CardContent className="p-8 text-white flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
                <p className="text-white/90">Sign up now and connect with service providers in your area.</p>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="mt-4 md:mt-0 whitespace-nowrap"
                onClick={navigateToAuth}
              >
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Index;
