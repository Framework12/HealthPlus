import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userAvatar?: string;
}

export function DashboardLayout({ children, userName = "Dr. Prachi", userAvatar }: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider>
  <div className="min-h-screen w-full bg-background-secondary rounded-xl">
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col">
        <header className="h-auto min-h-[64px] border-b border-card-border bg-card-glass backdrop-blur-glass shadow-glass">
          <div className="flex flex-col gap-2 px-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-0">
            <div className="flex flex-col items-center justify-center w-full sm:flex-row sm:justify-start sm:w-auto">
              <h1 className="text-base sm:text-2xl font-semibold text-foreground text-center sm:text-left leading-tight">
                <span className="block sm:inline">Welcome</span>
                <span className="block sm:inline text-primary"> {userName}!</span>
              </h1>
            </div>
              {/* Desktop icons layout */}
              <div className="flex flex-col items-center gap-2 w-full sm:flex-row sm:items-center sm:space-x-4 sm:w-auto sm:justify-end">
                {/* Search bar only visible on sm and up */}
                <div className="hidden sm:block relative w-full max-w-xs sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card-glass backdrop-blur-glass border-card-border w-full"
                  />
                </div>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="hidden sm:flex">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              {/* Mobile icons layout - absolute top right */}
              <div className="sm:hidden absolute top-4 right-4 z-50 flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
          </div>
        </header>
        <div className="flex-1 p-2 sm:p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  </div>
    </SidebarProvider>
  );
}