import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Inbox,
  Plus,
  Star,
  Trash2,
  Settings,
  Calendar,
  Users,
  Activity,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Create Task", href: "/create-task", icon: Plus },
  { name: "Important", href: "/important", icon: Star },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Analytics", href: "/analytics", icon: Activity },
  { name: "Trash", href: "/trash", icon: Trash2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContentEl = () => (
  <div className="h-full flex flex-col justify-between p-4 bg-gradient-to-br from-white/60 via-green-100/40 to-green-300/30 backdrop-blur-2xl border-r border-green-200/30 shadow-2xl shadow-green-200/30 rounded-3xl">
      <div className="flex-1">
        <SidebarHeader className="py-2 px-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            {!collapsed && (
              <div className="text-sidebar-foreground">
                <h2 className="text-xl font-bold">Health+</h2>
              </div>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className="mt-6 p-0">
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  className={`mb-1 transition-all duration-200 w-full justify-start rounded-xl px-3 py-2 bg-white/30 backdrop-blur-md border border-green-200/30 shadow-sm
                    ${
                      isActive(item.href)
                        ? "bg-green-200/40 text-primary-foreground font-semibold border-green-400/40 shadow-md"
                        : "text-sidebar-foreground hover:bg-white/40 hover:shadow-lg hover:border-green-300/40"
                    }
                  `}
                >
                  <NavLink to={item.href} onClick={() => setMobileOpen(false)}>
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </div>

      <div className="py-2">
        <Button
          variant="ghost"
          className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-xl
            ${collapsed ? "justify-center" : "px-3 py-2"}
          `}
          onClick={() => window.location.href = "/logout"}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-[100] p-2 rounded-lg bg-primary text-white shadow-lg"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      <Sidebar
        className={`hidden md:block ${
          collapsed ? "w-16" : "w-64"
        } transition-all duration-300 rounded-3xl bg-gradient-to-br from-white/60 via-green-100/40 to-green-300/30 backdrop-blur-2xl border-r border-green-200/30 shadow-2xl shadow-green-200/30`}
      >
        <SidebarContentEl />
      </Sidebar>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/40"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              className="fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-white/60 via-green-100/40 to-green-300/30 backdrop-blur-2xl border-r border-green-200/30 shadow-2xl shadow-green-200/30 rounded-3xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-lg bg-primary text-white z-50"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <SidebarContentEl />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}