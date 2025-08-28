import React, { useState } from 'react';
import { Brain, Sparkles, TrendingUp, AlertTriangle, Target, Zap, Activity, Pill, Settings } from 'lucide-react';
import { sampleIncidents } from '../../data/sampleData';
import TrendChart from '../Charts/TrendChart';
import MedicationChart from '../Charts/MedicationChart';
import HarmChart from '../Charts/HarmChart';

const AIReports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInsights, setGeneratedInsights] = useState<any>(null);
  const [selectedDataSource, setSelectedDataSource] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('comprehensive');

  const aiFeatures = [
    {
      id: 'predictive-analysis',
      title: 'Medication Risk Prediction',
      description: 'AI predicts potential medication incidents based on historical patterns',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'pattern-recognition',
      title: 'Error Pattern Recognition',
      description: 'Identifies recurring patterns in medication errors and near misses',
      icon: Target,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'risk-scoring',
      title: 'Medication Risk Scoring',
      description: 'Calculates risk scores for different medications and patient populations',
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'recommendations',
      title: 'Safety Recommendations',
      description: 'Provides AI-driven recommendations for medication safety improvements',
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const generateAIReport = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Dynamic chart data based on user selections
      const dynamicTrendData = selectedTimeframe === '6months' ? [
        { month: 'Aug', incidents: 12, nearMisses: 8 },
        { month: 'Sep', incidents: 10, nearMisses: 10 },
        { month: 'Oct', incidents: 8, nearMisses: 12 },
        { month: 'Nov', incidents: 6, nearMisses: 15 },
        { month: 'Dec', incidents: 4, nearMisses: 18 },
        { month: 'Jan', incidents: 6, nearMisses: 14 }
      ] : [
        { month: 'Nov', incidents: 6, nearMisses: 15 },
        { month: 'Dec', incidents: 4, nearMisses: 18 },
        { month: 'Jan', incidents: 6, nearMisses: 14 }
      ];

      const dynamicMedicationData = selectedDataSource === 'high_risk' ? [
        { medication: 'Insulin', incidents: 5, nearMisses: 3 },
        { medication: 'Warfarin', incidents: 4, nearMisses: 6 },
        { medication: 'Morphine', incidents: 3, nearMisses: 2 },
        { medication: 'Heparin', incidents: 2, nearMisses: 4 }
      ] : [
        { medication: 'Insulin', incidents: 3, nearMisses: 2 },
        { medication: 'Warfarin', incidents: 2, nearMisses: 4 },
        { medication: 'Morphine', incidents: 1, nearMisses: 1 },
        { medication: 'Penicillin', incidents: 0, nearMisses: 3 },
        { medication: 'Metformin', incidents: 1, nearMisses: 2 }
      ];

      const dynamicHarmData = [
        { name: 'no_harm', value: selectedAnalysisType === 'harm_focused' ? 12 : 8 },
        { name: 'minor_harm', value: selectedAnalysisType === 'harm_focused' ? 8 : 6 },
        { name: 'moderate_harm', value: selectedAnalysisType === 'harm_focused' ? 6 : 4 },
        { name: 'severe_harm', value: selectedAnalysisType === 'harm_focused' ? 4 : 2 },
        { name: 'death', value: 0 }
      ];

      setGeneratedInsights({
        chartData: {
          trends: dynamicTrendData,
          medications: dynamicMedicationData,
          harm: dynamicHarmData
        },
        riskAreas: [
          { area: 'ICU', riskScore: 85, trend: 'increasing', medication: 'High-risk infusions' },
          { area: 'Emergency Department', riskScore: 72, trend: 'stable', medication: 'Pain medications' },
          { area: 'Medical Ward', riskScore: 58, trend: 'decreasing', medication: 'Anticoagulants' },
          { area: 'Surgical Unit', riskScore: 45, trend: 'stable', medication: 'Antibiotics' }
        ],
        patterns: [
          'Insulin dosing errors increase by 35% during shift changes',
          'Wrong patient medication errors peak during busy periods (11 AM - 1 PM)',
          'Anticoagulant incidents correlate with new nursing staff assignments',
          'Look-alike/sound-alike medication errors occur 60% more in poor lighting conditions'
        ],
        predictions: [
          'High probability of insulin-related incident in ICU within next 14 days based on workload patterns',
          '25% increase in medication errors expected during upcoming flu season due to increased patient volume',
          'Warfarin dosing errors likely to increase by 15% with new resident rotations starting next month'
        ],
        recommendations: [
          'Implement smart pump technology for high-risk medications in ICU',
          'Enhance barcode scanning compliance during peak hours (11 AM - 1 PM)',
          'Develop specialized orientation program for anticoagulant management',
          'Improve lighting in medication preparation areas',
          'Create decision support alerts for look-alike/sound-alike medications'
        ],
        efficiency: {
          processingTime: '3.1 seconds',
          dataPoints: selectedDataSource === 'all' ? 1847 : 892,
          accuracy: selectedAnalysisType === 'comprehensive' ? '96.8%' : '94.2%',
          confidence: '92.5%'
        }
      });
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="mr-3 h-8 w-8 text-blue-600" />
          AI-Powered Medication Safety Analytics
        </h1>
        <p className="text-gray-600 mt-2">Leverage artificial intelligence to generate insights and predictions from your medication incident data.</p>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className={`p-3 rounded-lg ${feature.color} w-fit mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Generate Report Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            Generate AI Report
          </h2>
        </div>
        <div className="p-6">
          {/* Configuration Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
              <select
                value={selectedDataSource}
                onChange={(e) => setSelectedDataSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Medication Events</option>
                <option value="high_risk">High-Risk Medications Only</option>
                <option value="recent">Recent Events (Last 30 days)</option>
                <option value="severe">Severe Harm Events Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
                <option value="2years">Last 2 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
              <select
                value={selectedAnalysisType}
                onChange={(e) => setSelectedAnalysisType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="comprehensive">Comprehensive Analysis</option>
                <option value="trend_focused">Trend-Focused</option>
                <option value="harm_focused">Harm Assessment</option>
                <option value="predictive">Predictive Modeling</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis Ready</h3>
              <p className="text-gray-600">
                Our AI will analyze {selectedDataSource === 'all' ? sampleIncidents.length : Math.floor(sampleIncidents.length * 0.6)} medication events and generate comprehensive insights, predictions, and recommendations.
              </p>
            </div>
            
            <button
              onClick={generateAIReport}
              disabled={isGenerating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center mx-auto"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing Medication Data...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Analysis
                </>
              )}
            </button>

            {isGenerating && (
              <div className="mt-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                  <div className="flex items-center">
                    <div className="animate-pulse h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Processing medication incident data and identifying patterns...
                  </div>
                  <div className="text-xs text-blue-600">
                    Analyzing {selectedDataSource} data for {selectedTimeframe} with {selectedAnalysisType} approach...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Insights Results */}
      {generatedInsights && (
        <div className="space-y-8">
          {/* Dynamic Charts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                AI-Generated Dynamic Charts
              </h3>
              <p className="text-sm text-gray-600 mt-1">Charts updated based on your selected parameters</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <TrendChart data={generatedInsights.chartData.trends} title="Medication Event Trends (AI Analysis)" />
                <HarmChart data={generatedInsights.chartData.harm} title="Patient Harm Distribution (AI Analysis)" />
              </div>
              <MedicationChart data={generatedInsights.chartData.medications} title="High-Risk Medications (AI Analysis)" />
            </div>
          </div>

          {/* Risk Areas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Pill className="mr-2 h-5 w-5 text-red-500" />
                High-Risk Clinical Areas
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedInsights.riskAreas.map((area: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{area.area}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        area.riskScore >= 70 ? 'bg-red-100 text-red-800' :
                        area.riskScore >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {area.riskScore}% Risk
                      </span>
                    </div>
                    <p className="text-sm text-blue-600 mb-2">
                      <Pill className="inline h-3 w-3 mr-1" />
                      Primary concern: {area.medication}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className={`h-4 w-4 mr-1 ${
                        area.trend === 'increasing' ? 'text-red-500' :
                        area.trend === 'stable' ? 'text-yellow-500' :
                        'text-green-500'
                      }`} />
                      Trend: {area.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patterns Identified */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="mr-2 h-5 w-5 text-green-500" />
                Medication Error Patterns
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {generatedInsights.patterns.map((pattern: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm font-medium">{index + 1}</span>
                    </span>
                    <span className="text-gray-700">{pattern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Predictions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                Medication Safety Predictions
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {generatedInsights.predictions.map((prediction: string, index: number) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="p-1 bg-blue-200 rounded-full mr-3 mt-1">
                        <Brain className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-blue-800">{prediction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
                Safety Improvement Recommendations
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedInsights.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="p-1 bg-purple-200 rounded-full mr-3 mt-1">
                        <Sparkles className="h-3 w-3 text-purple-600" />
                      </div>
                      <span className="text-purple-800 text-sm">{recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Processing Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Processing Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{generatedInsights.efficiency.processingTime}</div>
                <div className="text-sm text-gray-600">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{generatedInsights.efficiency.dataPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Data Points Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{generatedInsights.efficiency.accuracy}</div>
                <div className="text-sm text-gray-600">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{generatedInsights.efficiency.confidence}</div>
                <div className="text-sm text-gray-600">Confidence Level</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReports;