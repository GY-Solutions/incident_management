import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  data: any[];
  title: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="incidents" 
            stroke="#dc2626" 
            strokeWidth={2}
            name="Incidents"
          />
          <Line 
            type="monotone" 
            dataKey="nearMisses" 
            stroke="#2563eb" 
            strokeWidth={2}
            name="Near Misses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;