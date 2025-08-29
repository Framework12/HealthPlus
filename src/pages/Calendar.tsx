import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users, Plus, Star } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";

const appointments = [
  {
    id: "1",
    title: "Patient Consultation",
    time: "09:00 AM",
    duration: "30 min",
    patient: "John Smith",
    type: "consultation",
    location: "Room 201",
    date: new Date(2025, 7, 25),
    isStarred: true,
  },
  {
    id: "2",
    title: "Surgery - Appendectomy",
    time: "11:30 AM",
    duration: "2 hours",
    patient: "Sarah Johnson",
    type: "surgery",
    location: "OR 3",
    date: new Date(2025, 7, 25),
    isStarred: false,
  },
  {
    id: "3",
    title: "Team Meeting",
    time: "02:00 PM",
    duration: "1 hour",
    patient: "Medical Team",
    type: "meeting",
    location: "Conference Room A",
    date: new Date(2025, 7, 26),
    isStarred: true,
  },
  {
    id: "4",
    title: "Lab Results Review",
    time: "04:00 PM",
    duration: "45 min",
    patient: "Patient X",
    type: "consultation",
    location: "Online",
    date: new Date(2025, 7, 26),
    isStarred: false,
  },
  {
    id: "5",
    title: "Follow-up Appointment",
    time: "10:00 AM",
    duration: "30 min",
    patient: "Jane Doe",
    type: "consultation",
    location: "Room 205",
    date: new Date(2025, 7, 27),
    isStarred: false,
  },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const selectedDateAppointments = appointments
    .filter(apt =>
      selectedDate && format(apt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    )
    .sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`);
      const timeB = new Date(`1970/01/01 ${b.time}`);
      return timeA.getTime() - timeB.getTime();
    });

  const appointmentsWithDates = appointments.map(apt => apt.date);

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'surgery': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'meeting': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today's Appointments";
    if (isTomorrow(date)) return "Tomorrow's Appointments";
    return format(date, "EEEE, MMMM d");
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground rounded-xl flex items-center justify-center shrink-0">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Calendar</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your appointments and schedule</p>
            </div>
          </div>
          <Button className="w-full sm:w-auto mt-2 sm:mt-0 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {appointments.filter(apt => isToday(apt.date)).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {appointments.filter(apt => {
                      const today = new Date();
                      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
                      const endOfWeek = new Date(startOfWeek);
                      endOfWeek.setDate(endOfWeek.getDate() + 6);
                      return apt.date >= startOfWeek && apt.date <= endOfWeek;
                    }).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Surgeries</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.type === 'surgery').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Meetings</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.type === 'meeting').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Appointments Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Calendar Card */}
          <Card className="w-full bg-card-glass backdrop-blur-glass border-card-border shadow-glass p-2 sm:p-4">
              <CardHeader className="p-0 pb-2 sm:pb-4">
                <CardTitle className="text-lg sm:text-2xl font-semibold text-foreground">Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full flex justify-center items-center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md w-full"
                    modifiers={{ appointments: appointmentsWithDates }}
                    modifiersStyles={{
                      appointments: {
                        border: '2px solid #3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '50%',
                      },
                    }}
                  />
                </div>
              </CardContent>
          </Card>
          
          {/* Appointments List */}
          <Card className="flex-1 bg-card-glass backdrop-blur-glass border-card-border shadow-glass p-4 sm:p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">
                {selectedDate ? getDateLabel(selectedDate) : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {selectedDateAppointments.length > 0 ? (
                selectedDateAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-background/50 border border-border rounded-lg p-4 space-y-3 hover:bg-secondary/50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{appointment.title}</h4>
                      <Badge className={getAppointmentTypeColor(appointment.type)}>
                        {appointment.type}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 shrink-0" />
                        <span className="whitespace-nowrap">{appointment.time} ({appointment.duration})</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 shrink-0" />
                        <span className="whitespace-nowrap">{appointment.patient}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 shrink-0" />
                      <span className="whitespace-nowrap">{appointment.location}</span>
                      {appointment.isStarred && (
                        <Star className="h-4 w-4 ml-auto text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">No appointments scheduled for this date.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}