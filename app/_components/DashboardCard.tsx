interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function DashboardCard({
  title,
  value,
  icon,
  trend,
}: DashboardCardProps) {
  return (
    <div
      className="p-6 rounded-lg border shadow-sm"
      style={{
        backgroundColor: "#111827", // bg-gray-900
        borderColor: "#374151", // border-gray-700
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {title}
          </p>
          <p
            className="text-2xl font-bold mt-2"
            style={{ color: "#f3f4f6" }} // text-gray-100
          >
            {typeof value === "number" && title.includes("Revenue")
              ? `$${value.toLocaleString()}`
              : value.toLocaleString()}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}
              </span>
              <span
                className="text-xs ml-1"
                style={{ color: "var(--text-secondary)" }}
              >
                vs last month
              </span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: "#374151" }} // bg-gray-700
        >
          <div style={{ color: "#9ca3af" }}>
            {" "}
            {/* text-gray-400 */}
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
