'use client';

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

type Series = {
  month: string;
  financial?: number;
  tangible?: number;
  intangible?: number;
};

export function BarChartCard({ data }: { data: Series[] }) {
  const CustomBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    const segmentHeight = 6;
    const gap = 3;
    const totalHeight = height;

    // We only draw if there's enough height
    if (totalHeight < segmentHeight) return null;

    const segmentCount = Math.floor(totalHeight / (segmentHeight + gap));

    return (
      <g>
        {Array.from({ length: segmentCount }).map((_, i) => {
          // specific y position for each segment, starting from bottom
          const yPos = y + totalHeight - (i + 1) * (segmentHeight + gap);
          return (
            <rect
              key={i}
              x={x}
              y={yPos}
              width={width}
              height={segmentHeight}
              fill={fill}
              rx={3}
              ry={3}
            />
          );
        })}
      </g>
    );
  };

  return (
    <div className="card p-6 h-96 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Overview</h3>
        {/* Legend will be handled by Recharts, or we can custom render it if needed */}
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar
            dataKey="tangible"
            fill="#4ade80"
            shape={<CustomBar />}
            name="Real Assets"
            barSize={24}
          />
          <Bar
            dataKey="intangible"
            fill="#8b5cf6"
            shape={<CustomBar />}
            name="Liabilities"
            barSize={24}
          />
          <Bar
            dataKey="financial"
            fill="#3b82f6"
            shape={<CustomBar />}
            name="Cash"
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

