import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard,
  Building2,
  LogOut,
  Menu,
  X,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Bestellungen',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      name: 'Geschäfte',
      href: '/admin/shops',
      icon: Building2,
    },
    {
      name: 'Bankkonten',
      href: '/admin/bank-accounts',
      icon: CreditCard,
    },
    {
      name: 'SMTP',
      href: '/admin/smtp',
      icon: Mail,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const maxWidth = location.pathname === '/admin/orders' ? 'max-w-[1921px]' : 'max-w-[1478px]';

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Modern Glassmorphism Sidebar */}
      <div className={cn(
        "hidden md:flex md:w-64 md:flex-col flex-shrink-0 relative",
        "before:absolute before:inset-0 before:bg-white/70 before:backdrop-blur-xl before:border-r before:border-white/20 before:shadow-2xl before:shadow-blue-500/10"
      )}>
        <div className="flex flex-col flex-grow pt-6 relative z-10">
          {/* Modern Logo Section */}
          <div className="flex items-center px-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500 font-medium">Heizöl Management</p>
              </div>
            </div>
          </div>

          {/* Modern Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-md hover:shadow-gray-200/50 hover:backdrop-blur-sm"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-all duration-300 flex-shrink-0",
                      isActive 
                        ? "text-white" 
                        : "text-gray-400 group-hover:text-blue-600 group-hover:scale-110"
                    )}
                  />
                  <span className="truncate">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Modern Logout Section */}
          <div className="px-4 pb-6">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start bg-white/50 backdrop-blur-sm border-white/20 text-gray-600 hover:text-red-600 hover:bg-red-50/50 hover:border-red-200 transition-all duration-300 shadow-sm"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Abmelden
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/80 backdrop-blur-md border-white/20 shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="pt-16 px-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 mb-2",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main content with modern styling */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-8">
            <div className={cn(maxWidth, "mx-auto px-4 sm:px-6 md:px-8")}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
