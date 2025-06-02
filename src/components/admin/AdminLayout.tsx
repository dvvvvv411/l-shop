
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Settings, 
  CreditCard,
  Building2,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAdminAuth();

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
      name: 'Einstellungen',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-48 md:flex-col flex-shrink-0">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      isActive
                        ? 'bg-red-100 border-red-500 text-red-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors duration-200'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-5 w-5 transition-colors duration-200 flex-shrink-0'
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            {/* Logout Button */}
            <div className="px-2 pb-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-[1478px] mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
