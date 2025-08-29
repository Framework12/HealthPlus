import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, CheckCircle, Circle } from "lucide-react";

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed" | "in-progress";
  priority: "low" | "medium" | "high";
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  onStatusChange?: (id: string, status: "pending" | "completed" | "in-progress") => void;
}

export function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  assignee,
  dueDate,
  onStatusChange
}: TaskCardProps) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800", 
    high: "bg-red-100 text-red-800"
  };

  const statusIcons = {
    pending: Circle,
    "in-progress": Clock,
    completed: CheckCircle
  };

  const StatusIcon = statusIcons[status];

  return (
    <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass hover:shadow-glass-hover transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={() => onStatusChange?.(id, status === "completed" ? "pending" : "completed")}
            >
              <StatusIcon className={`h-5 w-5 ${
                status === "completed" ? "text-primary" : "text-muted-foreground"
              }`} />
            </Button>
            
            <div className="flex-1">
              <h3 className={`font-medium ${
                status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
              }`}>
                {title}
              </h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={priorityColors[priority]} variant="secondary">
                  {priority}
                </Badge>
                {dueDate && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {dueDate}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {assignee && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {assignee.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  );
}