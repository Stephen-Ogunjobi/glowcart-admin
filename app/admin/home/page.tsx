import { getDashboardMetrics, getRecentOrders } from "@/app/_lib/data-services";
import DashboardCard from "@/app/_components/DashboardCard";
import RecentOrdersTable from "@/app/_components/RecentOrdersTable";
import LowStockAlert from "@/app/_components/LowStockAlert";
import MostOrderedProducts from "@/app/_components/MostOrderedProducts";

// Icons as SVG components
const UsersIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
    />
  </svg>
);

const ClipboardListIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const CurrencyDollarIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

const CubeIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
    />
  </svg>
);

export default async function Homepage() {
  const [metrics, recentOrders] = await Promise.all([
    getDashboardMetrics(),
    getRecentOrders(5),
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "#f3f4f6" }} // text-gray-100
        >
          Dashboard Overview
        </h1>
        <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Orders"
          value={metrics.totalOrders}
          icon={<ClipboardListIcon />}
        />
        <DashboardCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={<UsersIcon />}
        />
        <DashboardCard
          title="Total Products"
          value={metrics.totalProducts}
          icon={<CubeIcon />}
        />
        <DashboardCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          icon={<CurrencyDollarIcon />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowStockAlert />
        <MostOrderedProducts />
      </div>

      <div className="mt-8">
        <RecentOrdersTable orders={recentOrders} />
      </div>
    </div>
  );
}
