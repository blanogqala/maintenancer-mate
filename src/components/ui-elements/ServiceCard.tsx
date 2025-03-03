
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from '@/lib/utils';

export interface ServiceInfo {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  rating: number;
  price: number;
  currency?: string;
  providerName: string;
  estimatedTime?: string;
  distance?: string;
  isPopular?: boolean;
  isEmergency?: boolean;
}

interface ServiceCardProps {
  service: ServiceInfo;
  variant?: 'default' | 'compact' | 'featured';
  onClick?: () => void;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant = 'default',
  onClick,
  className,
}) => {
  const {
    title,
    category,
    imageUrl,
    rating,
    price,
    currency = 'ZAR',
    providerName,
    estimatedTime,
    distance,
    isPopular,
    isEmergency
  } = service;

  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  
  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-subtle',
        isFeatured ? 'border-handyhub-200 bg-gradient-to-br from-handyhub-50 to-white' : '',
        onClick ? 'cursor-pointer hover:-translate-y-1' : '',
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <div className={`bg-cover bg-center w-full ${isCompact ? 'h-32' : 'h-44'}`} 
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Tags Overlay */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isPopular && (
            <Badge variant="secondary" className="bg-white/90 text-handyhub-800 backdrop-blur-sm">
              Popular
            </Badge>
          )}
          {isEmergency && (
            <Badge variant="destructive" className="backdrop-blur-sm">
              SOS
            </Badge>
          )}
        </div>
        
        {/* Provider Distance */}
        {distance && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {distance} away
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className={cn(
        "space-y-1",
        isCompact ? "px-3 py-2" : "px-4 py-3"
      )}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={cn(
              "text-foreground",
              isCompact ? "text-base" : "text-lg"
            )}>
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {category}
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      {!isCompact && (
        <CardContent className="px-4 py-0">
          <div className="text-sm text-muted-foreground">
            <p>Provider: {providerName}</p>
            {estimatedTime && <p className="mt-1">Est. time: {estimatedTime}</p>}
          </div>
        </CardContent>
      )}
      
      <CardFooter className={cn(
        "flex justify-between items-center border-t",
        isCompact ? "px-3 py-2" : "px-4 py-3"
      )}>
        <div className="font-semibold text-handyhub-800">
          {currency} {price.toFixed(2)}
        </div>
        
        <Button variant="default" size={isCompact ? "sm" : "default"} className="bg-handyhub-500 hover:bg-handyhub-600 text-white">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
