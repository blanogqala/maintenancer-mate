
import { ServiceInfo } from '@/components/ui-elements/ServiceCard';

// Categories data with their IDs
export const categories = [
  { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
  { id: 'electrical', name: 'Electrical', icon: '⚡' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
  { id: 'carpentry', name: 'Carpentry', icon: '🪚' },
  { id: 'painting', name: 'Painting', icon: '🖌️' },
  { id: 'gardening', name: 'Gardening', icon: '🌱' },
  { id: 'moving', name: 'Moving', icon: '📦' },
  { id: 'appliance', name: 'Appliance', icon: '🔌' }
];

// Mock service data by category
const mockServicesByCategory: Record<string, ServiceInfo[]> = {
  plumbing: [
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
      id: '8',
      title: 'Drain Cleaning',
      category: 'Plumbing',
      imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 4.5,
      price: 200,
      providerName: 'DrainMaster Pro',
      estimatedTime: '1-2 hours',
      distance: '3.7 km',
    }
  ],
  electrical: [
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
      id: '9',
      title: 'Light Installation',
      category: 'Electrical',
      imageUrl: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.6,
      price: 150,
      providerName: 'Bright Spark Electric',
      estimatedTime: '1-2 hours',
      distance: '2.5 km',
    }
  ],
  cleaning: [
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
      id: '10',
      title: 'Carpet Cleaning',
      category: 'Cleaning',
      imageUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.7,
      price: 180,
      providerName: 'Fresh Start Cleaners',
      estimatedTime: '1-2 hours',
      distance: '2.8 km',
    }
  ],
  carpentry: [
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
    },
    {
      id: '11',
      title: 'Custom Shelving',
      category: 'Carpentry',
      imageUrl: 'https://images.unsplash.com/photo-1611145434336-2d2c72cc5d4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      rating: 4.8,
      price: 250,
      providerName: 'Woodcraft Solutions',
      estimatedTime: '2-3 hours',
      distance: '3.5 km',
    }
  ],
  gardening: [
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
      id: '12',
      title: 'Garden Design',
      category: 'Gardening',
      imageUrl: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      price: 300,
      providerName: 'Eden Gardens',
      estimatedTime: '2-3 hours',
      distance: '1.7 km',
    }
  ],
  appliance: [
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
      id: '13',
      title: 'Refrigerator Repair',
      category: 'Appliance Repair',
      imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      rating: 4.6,
      price: 280,
      providerName: 'Appliance Pros',
      estimatedTime: '1-2 hours',
      distance: '2.2 km',
    }
  ],
  painting: [
    {
      id: '14',
      title: 'Interior Painting',
      category: 'Painting',
      imageUrl: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.7,
      price: 250,
      providerName: 'Color Masters',
      estimatedTime: '3-6 hours',
      distance: '2.4 km',
    },
    {
      id: '15',
      title: 'Exterior Painting',
      category: 'Painting',
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 4.8,
      price: 350,
      providerName: 'Fresh Coat Painters',
      estimatedTime: '1-2 days',
      distance: '3.1 km',
    }
  ],
  moving: [
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
    },
    {
      id: '16',
      title: 'Residential Moving',
      category: 'Moving',
      imageUrl: 'https://images.unsplash.com/photo-1610143595935-3bd25d104237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.5,
      price: 400,
      providerName: 'Swift Movers',
      estimatedTime: '3-6 hours',
      distance: '2.8 km',
    }
  ]
};

// Function to get nearby services by category
export const nearbyServicesByCategory = (categoryId: string) => {
  const category = categories.find(cat => cat.id === categoryId);
  const services = mockServicesByCategory[categoryId] || [];
  
  return {
    categoryName: category?.name || 'Service',
    services
  };
};
