import { OverviewCards } from '@/components/admin/overview-cards';
import { RecentIssues } from '@/components/admin/recent-issues';
import { CategoryChart } from '@/components/admin/category-chart-client';


export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <OverviewCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <CategoryChart />
        </div>
        <div className="lg:col-span-3">
          <RecentIssues />
        </div>
      </div>
    </div>
  );
}
