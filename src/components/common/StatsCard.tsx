import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
}

export function StatsCard({ icon: Icon, value, label, iconColor = "text-primary" }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-elegant text-center">
      <CardContent className="p-4">
        <Icon className={`w-8 h-8 mx-auto mb-2 ${iconColor}`} />
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}