import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  List, 
  FileText, 
  Brain, 
  LogOut,
  Bell,
  User,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Incidents', href: '/create-incident', icon: Plus },
    { name: 'Incident Management', href: '/incidents', icon: List },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'AI-Based Reports', href: '/ai-reports', icon: Brain },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <h1 className="text-xl font-bold text-blue-600">MedSafe Pro</h1>
                </div>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 border-r-4 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;