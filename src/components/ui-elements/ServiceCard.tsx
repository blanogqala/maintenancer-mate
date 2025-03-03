
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export interface ServiceInfo {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  rating: number;
  price: number;
  providerName: string;
  estimatedTime: string;
  distance: string;
  isEmergency?: boolean;
  isPopular?: boolean;
  description?: string;
}

interface ServiceCardProps {
  service: ServiceInfo;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();

  const viewServiceDetails = () => {
    navigate(`/service/${service.id}`);
  };
  
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-32 md:h-auto relative">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {service.isEmergency && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Emergency
            </Badge>
          )}
          {service.isPopular && !service.isEmergency && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              Popular
            </Badge>
          )}
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.category}</p>
            </div>
            <div className="flex items-center mt-1 md:mt-0">
              <Star className="text-yellow-400 w-4 h-4 mr-1" />
              <span className="font-medium">{service.rating}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-3">
            <div className="flex items-center">
              <Clock className="text-muted-foreground w-4 h-4 mr-1" />
              <span>{service.estimatedTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-muted-foreground w-4 h-4 mr-1" />
              <span>{service.distance}</span>
            </div>
            <div className="font-medium">
              R{service.price}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted-foreground">{service.providerName}</span>
            <Button variant="outline" size="sm" onClick={viewServiceDetails}>
              View <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
