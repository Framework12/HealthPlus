import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description
}: StatsCardProps) {
  const changeInfo = {
    positive: { color: "text-green-500", icon: ArrowUp },
    negative: { color: "text-destructive", icon: ArrowDown },
    neutral: { color: "text-muted-foreground", icon: null }
  };

  const { color, icon: ChangeIcon } = changeInfo[changeType];

  return (
    <Card
      className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass hover:shadow-glass-hover transition-all duration-300 relative overflow-hidden group w-full"
      aria-label={title}
      role="region"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-2 z-10">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
          {description && (
            <p className="text-[0.65rem] text-muted-foreground leading-tight">{description}</p>
          )}
        </div>
        <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden />
      </CardHeader>

      <CardContent className="p-4 pt-0 z-10">
        <div className="flex items-end gap-2 text-xl font-bold text-foreground" aria-live="polite">
          {value}
          {change && ChangeIcon && (
            <ChangeIcon className={`h-4 w-4 ${color} shrink-0`} aria-hidden />
          )}
        </div>
        {change && (
          <p className={`text-[0.65rem] ${color} mt-1 flex items-center gap-1`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}