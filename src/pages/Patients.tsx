import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Activity,
  AlertCircle,
  CheckCircle,
  CircleUserRound,
  X,
} from "lucide-react";
import { format } from "date-fns";
import patientImage from "@/assets/patient.jpg";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  condition: string;
  status: "active" | "critical" | "stable";
  lastVisit: string;
  nextAppointment: string;
  avatar: string;
}

const patients: Patient[] = [
  {
    id: "1",
    name: "Amit Sharma",
    age: 45,
    gender: "Male",
    email: "amit.sharma@gmail.com",
    phone: "+91 98765 43210",
    address: "12 MG Road, Bengaluru, Karnataka",
    condition: "Hypertension",
    status: "active",
    lastVisit: "2024-08-20",
    nextAppointment: "2024-08-25",
    avatar: patientImage,
  },
  {
    id: "2",
    name: "Prachi Jain",
    age: 22,
    gender: "Female",
    email: "prachi.jain@yahoo.com",
    phone: "+91 91234 56789",
    address: "22 Nehru Nagar, Mumbai, Maharashtra",
    condition: "Post-Surgery Recovery",
    status: "critical",
    lastVisit: "2024-08-22",
    nextAppointment: "2024-08-24",
    avatar: patientImage,
  },
  {
    id: "3",
    name: "Rakesh Kumar",
    age: 58,
    gender: "Male",
    email: "rakesh.kumar@gmail.com",
    phone: "+91 99887 76655",
    address: "5 Park Street, Kolkata, West Bengal",
    condition: "Diabetes Management",
    status: "stable",
    lastVisit: "2024-08-18",
    nextAppointment: "2024-08-28",
    avatar: patientImage,
  },
  {
    id: "4",
    name: "Sneha Patel",
    age: 28,
    gender: "Female",
    email: "sneha.patel@hotmail.com",
    phone: "+91 90011 22334",
    address: "8 CG Road, Ahmedabad, Gujarat",
    condition: "Routine Checkup",
    status: "active",
    lastVisit: "2024-08-19",
    nextAppointment: "2024-08-30",
    avatar: patientImage,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.3)]";
    case "critical":
      return "bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.3)]";
    case "stable":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.3)]";
    default:
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4" />;
    case "critical":
      return <AlertCircle className="h-4 w-4" />;
    case "stable":
      return <Activity className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

// --- Patient Card ---
const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => {
  return (
    <Card className="bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <div className="flex flex-col items-center text-center mb-4">
        <Avatar className="h-16 w-16 ring-4 ring-offset-2 ring-offset-white shadow-lg">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback>
            {patient.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="mt-3 text-lg font-bold text-foreground">{patient.name}</h3>
        <p className="text-sm text-gray-500">{patient.age} yrs • {patient.gender}</p>
        <Badge className={`${getStatusColor(patient.status)} flex items-center gap-2 px-3 py-1 mt-2`}>
          {getStatusIcon(patient.status)}
          <span className="capitalize">{patient.status}</span>
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-foreground">
        <div className="flex items-center">
          <Activity className="h-4 w-4 mr-2 text-gray-400" />
          <span>{patient.condition}</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-gray-400" />
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-400" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span>{patient.address}</span>
        </div>
      </div>

      <div className="mt-4 border-t pt-3 space-y-2 text-xs text-foreground">
        <div className="flex justify-between">
          <span className="text-gray-500">Last Visit:</span>
          <span>{patient.lastVisit}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Next:</span>
          <span>{patient.nextAppointment}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Button size="sm" className="bg-primary text-white hover:scale-[1.02] transition">
          <Calendar className="h-4 w-4 mr-1" /> Schedule
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-gray-100">
          <CircleUserRound className="h-4 w-4 mr-1" /> View Records
        </Button>
      </div>
    </Card>
  );
};

// --- Patients Page ---
export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patientList, setPatientList] = useState([...patients]);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    email: "",
    phone: "",
    address: "",
    condition: "",
    status: "active" as "active" | "critical" | "stable",
    lastVisit: format(new Date(), 'yyyy-MM-dd'),
    nextAppointment: format(new Date(), 'yyyy-MM-dd'),
    avatar: "/src/assets/patient.jpg",
  });

  const filteredPatients = patientList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  function handleAddPatient(e: React.FormEvent) {
    e.preventDefault();
    setPatientList([
      ...patientList,
      {
        ...form,
        id: String(Date.now()),
        age: Number(form.age),
      },
    ]);
    setForm({
      name: "",
      age: "",
      gender: "Male",
      email: "",
      phone: "",
      address: "",
      condition: "",
      status: "active",
      lastVisit: format(new Date(), 'yyyy-MM-dd'),
      nextAppointment: format(new Date(), 'yyyy-MM-dd'),
      avatar: "/src/assets/patient.jpg",
    });
    setShowDialog(false);
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patients</h1>
            <p className="text-gray-500">Manage patient records and appointments</p>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white hover:scale-105 transition">
                <Plus className="h-4 w-4 mr-2" /> Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
              <DialogHeader className="flex justify-between items-center border-b pb-4">
                <DialogTitle className="text-xl font-bold">Add Patient</DialogTitle>
                <Button variant="ghost" onClick={() => setShowDialog(false)}><X /></Button>
              </DialogHeader>
              <form onSubmit={handleAddPatient} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" required type="number" min={0} value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <select id="gender" className="w-full border rounded px-2 py-1" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Input id="condition" required value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select id="status" className="w-full border rounded px-2 py-1" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as "active" | "critical" | "stable" }))}>
                      <option value="active">Active</option>
                      <option value="critical">Critical</option>
                      <option value="stable">Stable</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="lastVisit">Last Visit</Label>
                    <Input id="lastVisit" type="date" value={form.lastVisit} onChange={e => setForm(f => ({ ...f, lastVisit: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="nextAppointment">Next Appointment</Label>
                    <Input id="nextAppointment" type="date" value={form.nextAppointment} onChange={e => setForm(f => ({ ...f, nextAppointment: e.target.value }))} />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                  <Button type="submit" className="bg-primary text-white">Add</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {/* Search & Filter */}
        <Card className="p-4 shadow-md bg-white/60 backdrop-blur rounded-xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search patients by name, condition, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {["all", "active", "critical", "stable"].map((s) => (
                <Button
                  key={s}
                  variant={statusFilter === s ? "default" : "outline"}
                  onClick={() => setStatusFilter(s)}
                  className={`capitalize ${statusFilter === s ? "bg-primary text-white" : ""}`}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => <PatientCard key={p.id} patient={p} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No patients found 🚑</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}