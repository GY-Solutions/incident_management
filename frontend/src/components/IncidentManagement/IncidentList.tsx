import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Calendar, Brain, Pill, Activity } from 'lucide-react';
import { sampleIncidents } from '../../data/sampleData';
import { Incident } from '../../types';
import { format } from 'date-fns';

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState(sampleIncidents);
  const [filteredIncidents, setFilteredIncidents] = useState(sampleIncidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiSearchTerm, setAiSearchTerm] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMedication, setFilterMedication] = useState('all');

  // AI Search functionality
  const handleAiSearch = async () => {
    if (!aiSearchTerm.trim()) return;
    
    setIsAiSearching(true);
    
    // Simulate AI search processing
    setTimeout(() => {
      // AI-powered search logic (simulated)
      const aiFiltered = incidents.filter(incident => {
        const searchLower = aiSearchTerm.toLowerCase();
        
        // Smart search that understands context
        if (searchLower.includes('insulin') || searchLower.includes('diabetes')) {
          return incident.medicationName?.toLowerCase().includes('insulin') ||
                 incident.medicationClass?.toLowerCase().includes('antidiabetic') ||
                 incident.tags.some(tag => tag.includes('diabetes'));
        }
        
        if (searchLower.includes('high risk') || searchLower.includes('severe')) {
          return incident.severity === 'severe_harm' || incident.severity === 'moderate_harm';
        }
        
        if (searchLower.includes('allergy') || searchLower.includes('allergic')) {
          return incident.tags.some(tag => tag.includes('allergy')) ||
                 incident.description.toLowerCase().includes('allergy');
        }
        
        // Fallback to regular search
        return incident.title.toLowerCase().includes(searchLower) ||
               incident.description.toLowerCase().includes(searchLower) ||
               incident.medicationName?.toLowerCase().includes(searchLower);
      });
      
      setFilteredIncidents(aiFiltered);
      setIsAiSearching(false);
    }, 2000);
  };

  // Filter incidents based on search and filters
  React.useEffect(() => {
    if (isAiSearching) return; // Don't apply regular filters during AI search
    
    let filtered = incidents;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        incident =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.medicationName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(incident => incident.type === filterType);
    }

    // Severity filter
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(incident => incident.severity === filterSeverity);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(incident => incident.status === filterStatus);
    }

    // Medication filter
    if (filterMedication !== 'all') {
      filtered = filtered.filter(incident => incident.medicationClass === filterMedication);
    }

    setFilteredIncidents(filtered);
  }, [incidents, searchTerm, filterType, filterSeverity, filterStatus, filterMedication, isAiSearching]);

  const uniqueMedicationClasses = Array.from(new Set(incidents.map(i => i.medicationClass).filter(Boolean)));

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

  const getTypeColor = (type: string) => {
    return type === 'incident' 
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800';
  };

  const handleExport = (format: string) => {
    // Simulate export functionality
    const data = filteredIncidents.map(incident => ({
      ID: incident.id,
      Title: incident.title,
      Type: incident.type,
      Severity: incident.severity,
      Status: incident.status,
      Location: incident.location,
      'Reported By': incident.reportedBy,
      'Reported At': format(new Date(incident.reportedAt), 'yyyy-MM-dd HH:mm'),
      Category: incident.category
    }));
    
    console.log(`Exporting ${data.length} incidents as ${format}:`, data);
    alert(`Export initiated for ${data.length} incidents in ${format.toUpperCase()} format`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="mr-3 h-8 w-8 text-blue-600" />
          Medication Event Management
        </h1>
        <p className="text-gray-600 mt-2">View, filter, and manage all reported medication incidents and near misses.</p>
      </div>

      {/* AI Search */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="mr-2 h-5 w-5 text-purple-600" />
          AI-Powered Search
        </h2>
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={aiSearchTerm}
              onChange={(e) => setAiSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Try: 'insulin incidents', 'high risk events', 'allergy reactions'"
              onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
            />
          </div>
          <button
            onClick={handleAiSearch}
            disabled={isAiSearching || !aiSearchTerm.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
          >
            {isAiSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                AI Search
              </>
            )}
          </button>
        </div>
        {isAiSearching && (
          <div className="mt-3 text-sm text-purple-700">
            AI is analyzing patterns and context in your search query...
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search events..."
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="incident">Incidents</option>
              <option value="near_miss">Near Misses</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Harm Levels</option>
              <option value="no_harm">No Harm</option>
              <option value="minor_harm">Minor Harm</option>
              <option value="moderate_harm">Moderate Harm</option>
              <option value="severe_harm">Severe Harm</option>
              <option value="death">Death</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Medication Filter */}
          <div>
            <select
              value={filterMedication}
              onChange={(e) => setFilterMedication(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Medications</option>
              {uniqueMedicationClasses.map(medClass => (
                <option key={medClass} value={medClass}>{medClass}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredIncidents.length} of {incidents.length} events
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('csv')}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              CSV
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harm Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{incident.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{incident.location}</p>
                      <p className="text-xs text-gray-400 mt-1">Reported by: {incident.reportedBy}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Pill className="h-4 w-4 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{incident.medicationName}</p>
                        <p className="text-xs text-gray-500">{incident.medicationClass}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getTypeColor(incident.type)}`}>
                      {incident.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getSeverityColor(incident.severity)}`}>
                      {incident.severity.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(new Date(incident.reportedAt), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredIncidents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentList;