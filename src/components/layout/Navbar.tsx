
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, Home, Calendar, Search, User } from "lucide-react";
import AnimatedLogo from '@/components/ui-elements/AnimatedLogo';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const navbarClass = transparent && !scrolled
    ? 'bg-transparent'
    : 'bg-white/80 backdrop-blur-md shadow-sm';
  
  const navItems = isAuthenticated
    ? user?.userType === 'provider'
      ? [
          { label: 'Dashboard', path: '/provider' },
          { label: 'My Jobs', path: '/provider/jobs' },
          { label: 'Messages', path: '/provider/messages' },
          { label: 'Earnings', path: '/provider/earnings' },
        ]
      : [
          { label: 'Services', path: '/services' },
          { label: 'Bookings', path: '/bookings' },
          { label: 'Support', path: '/support' },
        ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Services', path: '/services' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'For Providers', path: '/for-providers' },
      ];
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const mobileNavItems = isAuthenticated
    ? [
        { icon: Home, label: 'Home', path: user?.userType === 'provider' ? '/provider' : '/user' },
        { icon: Search, label: 'Explore', path: '/services' },
        { icon: Calendar, label: 'Bookings', path: '/bookings' },
        { icon: User, label: 'Profile', path: '/profile' },
      ]
    : [];
    
  return (
    <>
      {/* Main Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClass}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <AnimatedLogo size="sm" onClick={() => navigate('/')} className="cursor-pointer" />
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="text-foreground hover:text-handyhub-600 transition-colors"
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Bell size={20} />
                </Button>
                <Button 
                  variant="outline"
                  className="border-handyhub-200 text-handyhub-800 hover:bg-handyhub-50"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  className="text-foreground"
                  onClick={() => navigate('/auth/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="default"
                  className="bg-handyhub-500 hover:bg-handyhub-600 text-white"
                  onClick={() => navigate('/auth/register')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex-1 space-y-4 py-6">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-3 text-foreground hover:bg-handyhub-50 rounded-lg transition-colors"
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-100 py-6">
            {isAuthenticated ? (
              <Button 
                variant="outline"
                className="w-full border-handyhub-200 text-handyhub-800 hover:bg-handyhub-50"
                onClick={() => logout()}
              >
                Logout
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  variant="outline"
                  className="w-full border-handyhub-200 text-handyhub-800 hover:bg-handyhub-50"
                  onClick={() => navigate('/auth/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="default"
                  className="w-full bg-handyhub-500 hover:bg-handyhub-600 text-white"
                  onClick={() => navigate('/auth/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation for Mobile - Only shown when authenticated */}
      {isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 md:hidden">
          <div className="grid grid-cols-4 gap-1">
            {mobileNavItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center py-3 hover:bg-handyhub-50"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon size={20} className="text-gray-600" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
