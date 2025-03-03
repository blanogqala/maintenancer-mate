
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedLogo from '../ui-elements/AnimatedLogo';
import { Check, ChevronRight } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  image: string;
}

const steps: OnboardingStep[] = [
  {
    id: 'step1',
    title: 'Find Local Service Providers',
    description: 'Connect with trusted professionals in your area for all your home maintenance needs.',
    image: 'https://images.unsplash.com/photo-1581092459776-4c875cf26a58?q=80&w=1600&auto=format',
  },
  {
    id: 'step2',
    title: 'Book Services With Ease',
    description: 'Schedule appointments, get quotes, and manage bookings all in one place.',
    image: 'https://images.unsplash.com/photo-1677517446429-20bab50037c0?q=80&w=1600&auto=format',
  },
  {
    id: 'step3',
    title: 'Emergency SOS Feature',
    description: 'Need urgent help? Use our SOS feature to find immediate assistance for emergencies.',
    image: 'https://images.unsplash.com/photo-1587385789097-0197a7fbd179?q=80&w=1600&auto=format',
  },
  {
    id: 'step4',
    title: 'Track & Pay Securely',
    description: 'Monitor service progress and make secure payments through our platform.',
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1600&auto=format',
  }
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handleSkip = () => {
    onComplete();
  };
  
  const step = steps[currentStep];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo */}
      <div className="flex justify-center pt-10 pb-4">
        <AnimatedLogo size="md" textPosition="bottom" />
      </div>
      
      {/* Image */}
      <div 
        className="relative flex-1 w-full bg-cover bg-center mb-6 min-h-[40vh]"
        style={{ backgroundImage: `url(${step.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      {/* Content */}
      <Card className="animate-slide-up border-0 rounded-t-3xl -mt-8 shadow-none">
        <CardContent className="p-6 pt-8">
          <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
          <p className="text-muted-foreground mb-8">{step.description}</p>
          
          {/* Step indicators */}
          <div className="flex justify-center mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full mx-1 transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-8 bg-handyhub-500' 
                    : index < currentStep 
                      ? 'w-2 bg-handyhub-300' 
                      : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleNext}
              className="bg-handyhub-500 hover:bg-handyhub-600 text-white w-full py-6 h-auto"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Continue <ChevronRight className="ml-1 h-5 w-5" />
                </>
              ) : (
                <>
                  Get Started <Check className="ml-1 h-5 w-5" />
                </>
              )}
            </Button>
            
            {currentStep < steps.length - 1 && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-muted-foreground"
              >
                Skip onboarding
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingScreen;
