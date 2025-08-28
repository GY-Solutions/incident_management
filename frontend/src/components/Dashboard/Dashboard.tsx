import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  Activity,
  Shield,
  Pill
} from 'lucide-react';
import { sampleIncidents, sampleNotifications } from '../../data/sampleData';
import TrendChart from '../Charts/TrendChart';
import MedicationChart from '../Charts/MedicationChart';
import HarmChart from '../Charts/HarmChart';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const recentIncidents = sampleIncidents.slice(0, 5);
  const unreadNotifications = sampleNotifications.filter(n => !n.read);

  // Chart data
  const trendData = [
    { month: 'Oct', incidents: 8, nearMisses: 12 },
    { month: 'Nov', incidents: 6, nearMisses: 15 },
    { month: 'Dec', incidents: 4, nearMisses: 18 },
    { month: 'Jan', incidents: 6, nearMisses: 14 }
  ];

  const medicationData = [
    { medication: 'Insulin', incidents: 3, nearMisses: 2 },
    { medication: 'Warfarin', incidents: 2, nearMisses: 4 },
    { medication: 'Morphine', incidents: 1, nearMisses: 1 },
    { medication: 'Penicillin', incidents: 0, nearMisses: 3 }
  ];

  const harmData = [
    { name: 'no_harm', value: 8 },
    { name: 'minor_harm', value: 6 },
    { name: 'moderate_harm', value: 4 },
    { name: 'severe_harm', value: 2 },
    { name: 'death', value: 0 }
  ];

  const stats = [
    {
      name: 'Medication Incidents',
      value: sampleIncidents.length,
      icon: Pill,
      color: 'text-red-600 bg-red-100'
    },
    {
      name: 'Open Cases',
      value: sampleIncidents.filter(i => i.status === 'open' || i.status === 'investigating').length,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      name: 'Resolved Cases',
      value: sampleIncidents.filter(i => i.status === 'resolved' || i.status === 'closed').length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      name: 'Safety Events',
      value: sampleIncidents.filter(i => i.type === 'near_miss').length,
      icon: Shield,
      color: 'text-blue-600 bg-blue-100'
    }
  ];

  const getSeverityColor = (severity: string) => {
    const colors = {
      no_harm: 'bg-green-100 text-green-800',
      minor_harm: 'bg-yellow-100 text-yellow-800',
      moderate_harm: 'bg-orange-100 text-orange-800',
      severe_harm: 'bg-red-100 text-red-800',
      death: 'bg-gray-900 text-white'
    };
    return colors[severity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-red-100 text-red-800',
      investigating: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="mr-3 h-8 w-8 text-blue-600" />
          Medication Safety Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Monitor medication incidents, near misses, and safety trends.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/create-incident"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Report Medication Event
              </h3>
              <p className="text-gray-600">Report medication incidents or near misses</p>
            </div>
          </div>
        </Link>

        <Link
          to="/incidents"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors duration-200">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                Manage Events
              </h3>
              <p className="text-gray-600">View and manage all medication events</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TrendChart data={trendData} title="Event Trend Analysis" />
        <HarmChart data={harmData} title="Harm Level Distribution" />
      </div>

      <div className="mb-8">
        <MedicationChart data={medicationData} title="Top Medications Involved in Events" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Incidents */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Medication Events
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{incident.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(incident.severity)}`}>
                      {incident.severity.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{incident.description}</p>
                  {incident.medicationName && (
                    <p className="text-sm text-blue-600 mb-2">
                      <Pill className="inline h-4 w-4 mr-1" />
                      {incident.medicationName} ({incident.medicationClass})
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500">
                        {format(new Date(incident.reportedAt), 'MMM dd, yyyy')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                    <span className="text-gray-500">{incident.location}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link
                to="/incidents"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
              >
                View all events →
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
              {unreadNotifications.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
            </h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {sampleNotifications.slice(0, 6).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {format(new Date(notification.createdAt), 'MMM dd, HH:mm')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;