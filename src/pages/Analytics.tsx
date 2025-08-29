import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Activity,
  TrendingUp,
  Users,
  Calendar,
  Heart,
  FileText,
  Clock,
  Target,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", patients: 45, appointments: 68, revenue: 15400 },
  { month: "Feb", patients: 52, appointments: 78, revenue: 18200 },
  { month: "Mar", patients: 48, appointments: 72, revenue: 16800 },
  { month: "Apr", patients: 61, appointments: 89, revenue: 21300 },
  { month: "May", patients: 55, appointments: 82, revenue: 19600 },
  { month: "Jun", patients: 67, appointments: 95, revenue: 23800 },
];

const patientStatusData = [
  { name: "Active", value: 45, color: "#10b981" },
  { name: "Critical", value: 8, color: "#ef4444" },
  { name: "Stable", value: 23, color: "#3b82f6" },
  { name: "Recovery", value: 12, color: "#f59e0b" },
];

const appointmentTypes = [
  { type: "Consultation", count: 156, percentage: 45 },
  { type: "Surgery", count: 78, percentage: 22 },
  { type: "Follow-up", count: 89, percentage: 26 },
  { type: "Emergency", count: 23, percentage: 7 },
];

const weeklyActivity = [
  { day: "Mon", consultations: 12, surgeries: 3, followups: 8 },
  { day: "Tue", consultations: 15, surgeries: 2, followups: 6 },
  { day: "Wed", consultations: 18, surgeries: 4, followups: 10 },
  { day: "Thu", consultations: 14, surgeries: 1, followups: 7 },
  { day: "Fri", consultations: 16, surgeries: 3, followups: 9 },
  { day: "Sat", consultations: 8, surgeries: 1, followups: 4 },
  { day: "Sun", consultations: 5, surgeries: 0, followups: 2 },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Track performance and insights</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <Button variant="outline" className="w-full sm:w-auto bg-card-glass backdrop-blur-glass border-card-border">
              Export Report
            </Button>
            <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">1,234</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 mt-2 sm:mt-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">346</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0 mt-2 sm:mt-0">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">94.2%</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <Target className="h-3 w-3 mr-1" />
                    +2.1% improvement
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0 mt-2 sm:mt-0">
                  <Heart className="h-4 w-4 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">18m</p>
                  <p className="text-xs text-red-400 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    +3m from last month
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center shrink-0 mt-2 sm:mt-0">
                  <Clock className="h-4 w-4 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Monthly Trends */}
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-foreground text-xl">Monthly Trends</CardTitle>
              <Badge className="bg-primary/10 text-primary border-primary/20">Last 6 Months</Badge>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="patients"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.3)"
                  />
                  <Area
                    type="monotone"
                    dataKey="appointments"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="rgba(59, 130, 246, 0.3)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Patient Status Distribution */}
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-foreground text-xl">Patient Status</CardTitle>
              <Badge className="bg-primary/10 text-primary border-primary/20">Real-time</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={patientStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {patientStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2 text-sm md:w-1/2">
                  {patientStatusData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-foreground">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Weekly Activity */}
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-foreground text-xl">Weekly Activity</CardTitle>
              <Badge className="bg-primary/10 text-primary border-primary/20">This Week</Badge>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="consultations" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="surgeries" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="followups" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Appointment Types */}
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-foreground text-xl">Appointment Types</CardTitle>
              <Badge className="bg-primary/10 text-primary border-primary/20">This Month</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointmentTypes.map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{type.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{type.count}</span>
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        {type.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-foreground flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Reports
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Monthly Patient Summary", date: "2024-08-23", status: "Generated" },
                { name: "Appointment Analytics", date: "2024-08-22", status: "In Progress" },
                { name: "Financial Report Q3", date: "2024-08-21", status: "Generated" },
                { name: "Staff Performance Review", date: "2024-08-20", status: "Generated" },
              ].map((report, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-background/50 backdrop-blur-sm rounded-lg border border-card-border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <Badge
                    className={report.status === "Generated" ? "bg-green-500/20 text-green-400 border-green-500/30 mt-2 sm:mt-0" : "bg-orange-500/20 text-orange-400 border-orange-500/30 mt-2 sm:mt-0"}
                  >
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}