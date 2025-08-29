import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TaskCard } from "@/components/TaskCard";
import { StatsCard } from "@/components/StatsCard";
import { RecentActivity } from "@/components/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Plus,
  ArrowRight
} from "lucide-react";
import doctorImage from "@/assets/doctor-portrait.jpg";

interface Task {
  id: string;
  title: string;
  status: "pending" | "completed" | "in-progress";
  priority: "low" | "medium" | "high";
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
}

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Patient Rounds",
      status: "in-progress",
      priority: "high",
      assignee: { name: "Dr. Ali", avatar: "" },
      dueDate: "Today"
    },
    {
      id: "2", 
      title: "Laboratory test results review",
      status: "pending",
      priority: "medium",
      assignee: { name: "Dr. Sarah", avatar: "" },
      dueDate: "Tomorrow"
    },
    {
      id: "3",
      title: "Surgical procedures",
      status: "completed",
      priority: "high", 
      assignee: { name: "Dr. Ahmed", avatar: "" },
      dueDate: "Yesterday"
    }
  ]);

  const recentActivities = [
    {
      id: "1",
      user: { name: "Dr. Ali", avatar: "", role: "Cardiologist" },
      action: "Patient Rounds - Please look into vital signs of patient 'Thomas'",
      timestamp: "2 min ago",
      type: "message" as const
    },
    {
      id: "2",
      user: { name: "Dr. Neha", avatar: "", role: "Neurologist" },
      action: "Medication Administration - New prescription added",
      timestamp: "10 min ago", 
      type: "task" as const
    },
    {
      id: "3",
      user: { name: "Head Nurse", avatar: "", role: "Nursing Staff" },
      action: "Follow-up Appointments - Schedule for next week",
      timestamp: "15 min ago",
      type: "appointment" as const
    },
    {
      id: "4",
      user: { name: "Ward Boy", avatar: "", role: "Support Staff" },
      action: "Laboratory test results review - Report updated",
      timestamp: "1 hour ago",
      type: "update" as const
    }
  ];

  const handleTaskStatusChange = (id: string, status: "pending" | "completed" | "in-progress") => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  return (
    <DashboardLayout userName="Dr.Prachi">
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <StatsCard
            title="New Patients"
            value="40"
            change="+5% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Repeat Patients"
            value="32"
            change="+2% from last month"
            changeType="positive"
            icon={Clock}
          />
          <StatsCard
            title="Appointments"
            value="24"
            change="6 today"
            changeType="neutral"
            icon={CalendarIcon}
          />
          <StatsCard
            title="Performance"
            value="95%"
            change="+12% from last week"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="md:col-span-2">
            <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass p-4 sm:p-6">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 sm:pb-6">
                <div>
                  <CardTitle className="text-xl md:text-2xl font-semibold text-foreground">
                    Recently Assigned Tasks
                  </CardTitle>
                  <Badge className="bg-primary text-primary-foreground mt-2">62</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Button 
                    className="w-full sm:w-fit bg-primary hover:bg-primary-dark text-primary-foreground"
                    onClick={() => window.location.href = '/create-task'}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create new task
                  </Button>
                  <img 
                    src={doctorImage} 
                    alt="Doctor" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-lg shrink-0 hidden sm:block"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onStatusChange={handleTaskStatusChange}
                  />
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full text-primary hover:text-primary-dark"
                >
                  View all
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <RecentActivity activities={recentActivities} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass p-4 sm:p-6">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-xl font-semibold text-foreground">
                Calendar
              </CardTitle>
              <p className="text-sm text-muted-foreground">January 2023</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex justify-center items-center w-full">
                <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Daily Read & Statistics on Tablets */}
          <div className="grid grid-cols-1 sm:col-span-1 gap-4 sm:gap-6 md:col-span-2 md:grid-cols-2">
            <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass p-4 sm:p-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Daily Read
                </CardTitle>
                <Button variant="ghost" className="text-primary hover:text-primary-dark p-0 h-auto">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-primary rounded-lg p-4 text-primary-foreground">
                  <h3 className="font-medium text-lg mb-2">New rules in the dose of medicines to be consumed</h3>
                  <p className="text-sm opacity-90">Important updates on medication dosage guidelines...</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-secondary rounded-lg p-3">
                    <Badge className="bg-primary text-primary-foreground mb-2">Monthly doctor's meet</Badge>
                    <p className="text-sm text-muted-foreground">Scheduled for next week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass p-4 sm:p-6">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Statistics
                </CardTitle>
                <p className="text-sm text-muted-foreground">Last 6 Months</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">51%</div>
                    <div className="text-xs text-muted-foreground">Appointments</div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">32%</div>
                    <div className="text-xs text-muted-foreground">Walk-in patients</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Patient satisfaction</span>
                    <span className="text-primary font-medium">94%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[94%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}