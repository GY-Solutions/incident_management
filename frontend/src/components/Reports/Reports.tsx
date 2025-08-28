import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, BarChart3, Users, Activity, Pill } from 'lucide-react';
import { sampleReports, sampleIncidents } from '../../data/sampleData';
import TrendChart from '../Charts/TrendChart';
import MedicationChart from '../Charts/MedicationChart';
import HarmChart from '../Charts/HarmChart';
import { format } from 'date-fns';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Calculate statistics for reports
  const totalIncidents = sampleIncidents.length;
  const openIncidents = sampleIncidents.filter(i => i.status === 'open' || i.status === 'investigating').length;
  const resolvedIncidents = sampleIncidents.filter(i => i.status === 'resolved' || i.status === 'closed').length;
  const nearMisses = sampleIncidents.filter(i => i.type === 'near_miss').length;

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
    { medication: 'Penicillin', incidents: 0, nearMisses: 3 },
    { medication: 'Metformin', incidents: 1, nearMisses: 2 }
  ];

  const harmData = [
    { name: 'no_harm', value: 8 },
    { name: 'minor_harm', value: 6 },
    { name: 'moderate_harm', value: 4 },
    { name: 'severe_harm', value: 2 },
    { name: 'death', value: 0 }
  ];

  const reportTypes = [
    {
      id: 'medication-safety-overview',
      title: 'Medication Safety Overview',
      description: 'Comprehensive overview of all medication incidents and trends',
      icon: BarChart3,
      data: { incidents: totalIncidents, nearMisses, resolved: resolvedIncidents }
    },
    {
      id: 'medication-analysis',
      title: 'Medication Error Analysis',
      description: 'Detailed analysis of medication error patterns and root causes',
      icon: TrendingUp,
      data: { categories: ['Wrong Dose', 'Wrong Drug', 'Wrong Patient'], trends: 'Decreasing' }
    },
    {
      id: 'harm-assessment',
      title: 'Patient Harm Assessment',
      description: 'Analysis of patient harm levels and clinical outcomes',
      icon: FileText,
      data: { noHarm: 8, minorHarm: 6, moderateHarm: 4, severeHarm: 2 }
    },
    {
      id: 'medication-class-report',
      title: 'High-Risk Medication Classes',
      description: 'Analysis of medication classes most involved in incidents',
      icon: Users,
      data: { antidiabetics: 5, anticoagulants: 4, opioids: 3, antibiotics: 2 }
    }
  ];

  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId} for period: ${selectedPeriod}`);
    alert(`Generating ${reportTypes.find(r => r.id === reportId)?.title} for ${selectedPeriod} period...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="mr-3 h-8 w-8 text-blue-600" />
          Medication Safety Reports
        </h1>
        <p className="text-gray-600 mt-2">Generate and view detailed reports based on medication incident data.</p>
      </div>

      {/* Report Period Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Period</h2>
        <div className="flex space-x-4">
          {['weekly', 'monthly', 'quarterly', 'annual'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <Pill className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Medication Events</p>
              <p className="text-2xl font-bold text-gray-900">{totalIncidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Cases</p>
              <p className="text-2xl font-bold text-gray-900">{openIncidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{resolvedIncidents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Near Misses</p>
              <p className="text-2xl font-bold text-gray-900">{nearMisses}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TrendChart data={trendData} title="Medication Event Trends" />
        <HarmChart data={harmData} title="Patient Harm Distribution" />
      </div>

      <div className="mb-8">
        <MedicationChart data={medicationData} title="Medications Most Involved in Events" />
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Available Reports</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Report Data Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Preview Data:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(report.data).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-medium text-gray-900 ml-2">
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleGenerateReport(report.id)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sampleReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Generated on {format(new Date(report.generatedAt), 'MMM dd, yyyy')} by {report.generatedBy}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    <FileText className="h-5 w-5" />
                  </button>
                  <button className="text-green-600 hover:text-green-800 transition-colors duration-200">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;