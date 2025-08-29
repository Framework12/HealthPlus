import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star, Search, Filter } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  starred: boolean;
}

const importantTasks: Task[] = [
  {
    id: "1",
    title: "Critical Patient Review",
    description: "Review urgent case for patient with complications",
    priority: "high",
    dueDate: "2024-08-24",
    status: "pending",
    starred: true,
  },
  {
    id: "2", 
    title: "Surgery Preparation",
    description: "Prepare documents and schedule for upcoming surgery",
    priority: "high",
    dueDate: "2024-08-25",
    status: "in-progress",
    starred: true,
  },
  {
    id: "3",
    title: "Research Paper Deadline",
    description: "Submit medical research paper to journal",
    priority: "medium",
    dueDate: "2024-08-26",
    status: "completed",
    starred: true,
  },
  {
    id: "4",
    title: "Review New Protocol",
    description: "Read and understand the new hospital protocol",
    priority: "low",
    dueDate: "2024-08-27",
    status: "pending",
    starred: true,
  },
  {
    id: "5",
    title: "Follow Up with Dr. Jones",
    description: "Discuss patient case with Dr. Jones",
    priority: "high",
    dueDate: "2024-08-28",
    status: "pending",
    starred: true,
  }
];

export default function Important() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = importantTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 bg-primary-foreground rounded-xl flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-primary fill-current" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Important Tasks</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Your starred and high-priority items</p>
            </div>
          </div>
          <Badge className="bg-primary-foreground text-primary text-sm font-semibold py-1 px-3 mt-2 sm:mt-0 whitespace-nowrap">
            <Star className="h-4 w-4 mr-1 fill-current text-primary" />
            {filteredTasks.length} Important
          </Badge>
        </div>

        {/* Filters and Search Bar */}
        <Card className="bg-card-glass backdrop-blur-glass border-card-border rounded-xl p-4 sm:p-6 shadow-glass">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative w-full sm:w-auto sm:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search important tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full bg-input-glass backdrop-blur-glass border-input-border"
                />
              </div>
              <div className="flex flex-row items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-shrink-0">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                  className={`whitespace-nowrap w-auto ${filter === "all" ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-card-glass backdrop-blur-glass border-card-border text-foreground hover:bg-secondary/50'}`}
                >
                  All
                </Button>
                <Button
                  variant={filter === "pending" ? "default" : "outline"}
                  onClick={() => setFilter("pending")}
                  className={`whitespace-nowrap w-auto ${filter === "pending" ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-card-glass backdrop-blur-glass border-card-border text-foreground hover:bg-secondary/50'}`}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === "in-progress" ? "default" : "outline"}
                  onClick={() => setFilter("in-progress")}
                  className={`whitespace-nowrap w-auto ${filter === "in-progress" ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-card-glass backdrop-blur-glass border-card-border text-foreground hover:bg-secondary/50'}`}
                >
                  In Progress
                </Button>
                <Button
                  variant={filter === "completed" ? "default" : "outline"}
                  onClick={() => setFilter("completed")}
                  className={`whitespace-nowrap w-auto ${filter === "completed" ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-card-glass backdrop-blur-glass border-card-border text-foreground hover:bg-secondary/50'}`}
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        ) : (
          <div className="bg-card-glass backdrop-blur-glass border-card-border rounded-xl p-12 text-center shadow-glass">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4 fill-current" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Important Tasks</h3>
            <p className="text-muted-foreground">Star tasks to mark them as important and they'll appear here.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}