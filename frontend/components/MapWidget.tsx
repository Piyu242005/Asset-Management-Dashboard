type LocationPoint = { location: string; count: number };

export function MapWidget({ locations }: { locations: LocationPoint[] }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-slate-500">Assets By Locations</div>
          <div className="text-xs text-slate-400">Active • Maintenance • Retired</div>
        </div>
      </div>
      <div className="bg-indigo-50 rounded-xl h-52 flex items-center justify-center text-slate-500">
        <div>
          <div className="text-sm font-semibold text-center">Location Pins</div>
          <ul className="mt-2 text-xs space-y-1">
            {locations.map((loc) => (
              <li key={loc.location} className="flex justify-between gap-4">
                <span>{loc.location || "Unassigned"}</span>
                <span className="font-semibold">{loc.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

