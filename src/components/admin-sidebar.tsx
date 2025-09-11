import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  SidebarTrigger,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { UserNav } from "@/components/user-nav";
import { Home, ListTodo, Settings, BarChart, Users, LayoutDashboard, LineChart } from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: LineChart },
  { href: "/admin/issues", label: "Issues", icon: ListTodo },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r"
    >
      <SidebarHeader className="h-16 justify-between p-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild size="icon">
            <Link href="/dashboard">
              <Icons.logo className="size-8 text-primary" />
            </Link>
          </Button>
          <span className="font-bold text-lg">CivicConnect</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarGroup>
          <UserNav />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
