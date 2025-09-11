
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentIssues } from "@/components/admin/recent-issues";
import { ListTodo, CheckCircle, Clock, TrendingUp, Bell, PlusCircle } from "lucide-react";

export default function AdminHomePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Home</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 Days</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citizen Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Issues Today</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">Updated just now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8</div>
            <p className="text-xs text-muted-foreground">Updated just now</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <RecentIssues />
        </div>
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <Button><PlusCircle className="mr-2"/> Create New Issue</Button>
                    <Button variant="secondary">Manage User Roles</Button>
                    <Button variant="secondary">Generate Report</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Future Scope & Announcements</CardTitle>
                    <CardDescription>Upcoming features and system updates.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center text-sm text-muted-foreground">
                    <Bell className="mr-2 h-4 w-4"/>
                    <p>AI-powered trend analysis coming in Q4.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
