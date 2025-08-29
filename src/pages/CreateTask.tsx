import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  Users,
  Star,
  PlusCircle,
  Clock,
} from "lucide-react";

interface TaskFormData {
  title: string;
  description: string;
  assignee: string;
  priority: "high" | "medium" | "low";
  dueDate: Date | undefined;
}

export default function CreateTask() {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    assignee: "",
    priority: "medium",
    dueDate: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const assignees = [
    { value: "Dr. Ali", label: "Dr. Ali (Cardiologist)" },
    { value: "Dr. Neha", label: "Dr. Neha (Neurologist)" },
    { value: "Head Nurse", label: "Head Nurse (Nursing Staff)" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, dueDate: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simple validation
    if (!formData.title || !formData.assignee || !formData.dueDate) {
      setMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Task Created:", formData);
      setMessage("Task created successfully!");
      setIsSubmitting(false);
      // Reset form
      setFormData({
        title: "",
        description: "",
        assignee: "",
        priority: "medium",
        dueDate: undefined,
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
          Create New Task
        </h1>
        <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass w-full max-w-2xl mx-auto">
          <CardHeader className="border-b border-border p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-semibold">Task Details</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-2">
              Fill out the form below to create a new task for your team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Task Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Patient Rounds"
                  className="bg-input-glass backdrop-blur-glass border-input-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of the task."
                  className="bg-input-glass backdrop-blur-glass border-input-border min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="assignee" className="text-foreground">Assignee</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("assignee", value)}
                    value={formData.assignee}
                  >
                    <SelectTrigger className="bg-input-glass backdrop-blur-glass border-input-border">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select an assignee" />
                    </SelectTrigger>
                    <SelectContent className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
                      {assignees.map((assignee) => (
                        <SelectItem key={assignee.value} value={assignee.value}>
                          {assignee.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-foreground">Priority</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("priority", value)}
                    value={formData.priority}
                  >
                    <SelectTrigger className="bg-input-glass backdrop-blur-glass border-input-border">
                      <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-foreground">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-input-glass backdrop-blur-glass border-input-border"
                    >
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formData.dueDate ? (
                        <span>{formData.dueDate.toDateString()}</span>
                      ) : (
                        <span className="text-muted-foreground">Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dueDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto flex-1 bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Creating..." : "Create Task"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto flex-1 bg-transparent hover:bg-secondary/50 text-foreground"
                >
                  Cancel
                </Button>
              </div>
              {message && (
                <p className={`text-sm text-center mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}