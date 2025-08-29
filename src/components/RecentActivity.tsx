import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role?: string;
  };
  action: string;
  timestamp: string;
  type: "message" | "task" | "appointment" | "update";
}

interface RecentActivityProps {
  activities: ActivityItem[];
  title?: string;
}

export function RecentActivity({ activities, title = "Recent Conversations" }: RecentActivityProps) {
  const typeColors = {
    message: "bg-blue-100 text-blue-800",
    task: "bg-primary/10 text-primary",
    appointment: "bg-purple-100 text-purple-800",
    update: "bg-orange-100 text-orange-800"
  };

  return (
    <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {activity.user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {activity.user.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                  
                  {activity.user.role && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.user.role}
                    </Badge>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                  
                  <Badge className={`${typeColors[activity.type]} text-xs`} variant="secondary">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}