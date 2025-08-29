import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Edit,
  Trash2,
  Archive,
  Star,
  Check,
} from "lucide-react";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    role: string;
  };
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  priority: "normal" | "high";
  starred?: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: { name: "Dr. Ali", avatar: "", role: "Cardiologist" },
    subject: "Patient Rounds",
    preview: "Please look into vital signs of patient 'Thomas'...",
    timestamp: "04:00 PM",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    sender: { name: "Dr. Neha", avatar: "", role: "Neurologist" },
    subject: "Medication Administration",
    preview: "Please look into prescription for patient 'Sarah'...",
    timestamp: "02:00 PM",
    read: false,
    priority: "normal",
  },
  {
    id: "3",
    sender: { name: "Head Nurse", avatar: "", role: "Nursing Staff" },
    subject: "Follow-up Appointments",
    preview: "This is the follow-up log for the...",
    timestamp: "03:00 PM",
    read: true,
    priority: "normal",
  },
  {
    id: "4",
    sender: { name: "Ward Boy", avatar: "", role: "Support Staff" },
    subject: "Laboratory test results review",
    preview: "Please look into the latest results...",
    timestamp: "04:21 PM",
    read: false,
    priority: "high",
  },
  {
    id: "5",
    sender: { name: "Dr. Ali", avatar: "", role: "Cardiologist" },
    subject: "Patient Rounds",
    preview: "Please look into vital signs of patient 'John'...",
    timestamp: "01:00 PM",
    read: true,
    priority: "normal",
  },
  {
    id: "6",
    sender: { name: "Dr. Neha", avatar: "", role: "Neurologist" },
    subject: "Medication Administration",
    preview: "Please look into prescription dosage...",
    timestamp: "10:00 AM",
    read: false,
    priority: "normal",
  },
];

export default function Inbox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [messagesList, setMessagesList] = useState(initialMessages);

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === messagesList.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messagesList.map((msg) => msg.id));
    }
  };

  const filteredMessages = messagesList.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <DashboardLayout userName="Dr. Prachi">
      <div className="p-4 space-y-4 md:p-6 md:space-y-6 lg:p-8 lg:space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Inbox</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px] lg:w-[360px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-card-glass backdrop-blur-glass border-card-border"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto bg-card-glass backdrop-blur-glass border-card-border flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Filter</span>
            </Button>
            <Button className="w-full sm:w-auto flex items-center gap-2 flex-shrink-0">
              <Edit className="h-4 w-4" />
              <span className="hidden md:inline">Compose</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto pb-2">
          <Button variant="ghost" className="text-primary border-b-2 border-primary rounded-none whitespace-nowrap">
            All Messages
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground whitespace-nowrap">
            Unread
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground whitespace-nowrap">
            Important
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground whitespace-nowrap">
            Archived
          </Button>
        </div>
        
        {/* Message List Card */}
        <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
          {/* Card Header with Bulk Actions */}
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Checkbox
                checked={selectedMessages.length > 0 && selectedMessages.length === filteredMessages.length}
                onCheckedChange={handleSelectAll}
                aria-label="Select all messages"
              />
              <CardTitle className="text-sm sm:text-lg text-foreground">
                Messages
                <span className="ml-2 text-xs text-muted-foreground font-normal hidden sm:inline">
                  ({filteredMessages.length} total)
                </span>
              </CardTitle>
            </div>
            {selectedMessages.length > 0 && (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Button variant="ghost" size="icon" aria-label="Archive selected messages">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Mark selected messages as starred">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete selected messages">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Mark selected messages as read">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex items-center space-x-2 hidden md:flex">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">1-10 of {filteredMessages.length}</span>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Message List */}
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-280px)] sm:h-[calc(100vh-240px)]">
              <div className="space-y-0">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col sm:flex-row items-start gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-secondary/50 transition-colors duration-200 cursor-pointer
                      ${selectedMessages.includes(message.id) ? 'bg-secondary/70' : ''}
                      ${!message.read ? "bg-primary/5 font-medium" : "text-muted-foreground"}
                      border-b border-border
                    `}
                    onClick={() => handleSelectMessage(message.id)}
                  >
                    <div className="flex flex-row items-center gap-2 sm:gap-4 w-full min-w-0">
                      <Checkbox
                        checked={selectedMessages.includes(message.id)}
                        onCheckedChange={() => handleSelectMessage(message.id)}
                        aria-label={`Select message from ${message.sender.name}`}
                        className="shrink-0 mt-1"
                      />
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 mt-1">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {message.sender.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <p className={`text-xs sm:text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${!message.read ? 'text-foreground' : 'text-muted-foreground'}`}> 
                            {message.sender.name}
                          </p>
                          <Badge variant="secondary" className="text-xs shrink-0 hidden md:block">
                            {message.sender.role}
                          </Badge>
                          {message.priority === "high" && (
                            <Badge className="bg-red-100 text-red-800 text-xs shrink-0 hidden md:block">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium whitespace-normal break-words">
                            {message.subject}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground whitespace-normal break-words">
                            {message.preview}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2 sm:gap-4 text-xs font-normal shrink-0 mt-2 sm:mt-0 ml-auto w-full sm:w-auto">
                      <div className="flex items-center">
                          <Star className={`h-4 w-4 ${message.starred ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                      </div>
                      <span className="text-[13px] sm:text-sm font-semibold text-foreground bg-muted px-2 py-0.5 rounded sm:bg-transparent sm:font-normal sm:text-muted-foreground whitespace-nowrap block">{message.timestamp}</span>
                      <Button variant="ghost" size="icon" className="shrink-0 hidden sm:inline-flex">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}