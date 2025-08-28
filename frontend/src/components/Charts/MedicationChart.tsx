import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MedicationChartProps {
  data: any[];
  title: string;
}

const MedicationChart: React.FC<MedicationChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="medication" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="incidents" fill="#dc2626" name="Incidents" />
          <Bar dataKey="nearMisses" fill="#2563eb" name="Near Misses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MedicationChart;