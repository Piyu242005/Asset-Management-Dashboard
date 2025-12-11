import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "purple" | "orange";
};

const colors = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
};

export function StatsCard({ title, value, subtitle, icon, color = "blue" }: Props) {
  return (
    <div className="card p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4">
      {icon && (
        <div className={`p-3 rounded-full ${colors[color]}`}>
          {icon}
        </div>
      )}
      <div>
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="text-2xl font-bold mt-1 text-slate-900">{value}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
}

