
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ServiceInfo } from '@/components/ui-elements/ServiceCard';
import ServiceCard from '@/components/ui-elements/ServiceCard';
import { nearbyServicesByCategory } from '@/data/services';

const CategoryProviders: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<ServiceInfo[]>([]);
  const [categoryName, setCategoryName] = useState('');
  
  useEffect(() => {
    if (categoryId) {
      // Get providers from our mock data
      const categoryData = nearbyServicesByCategory(categoryId);
      setProviders(categoryData.services);
      setCategoryName(categoryData.categoryName);
    }
  }, [categoryId]);
  
  return (
    <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">{categoryName} Services</h1>
      
      {providers.length > 0 ? (
        <div className="space-y-4">
          {providers.map((service) => (
            <div key={service.id} className="animate-fade-in">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No providers found for this category</p>
        </div>
      )}
    </div>
  );
};

export default CategoryProviders;
