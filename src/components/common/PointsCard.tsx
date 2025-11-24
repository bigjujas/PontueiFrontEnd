import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface PointsCardProps {
  currentPoints: number;
  nextRewardPoints: number;
  userLevel?: string;
}

export function PointsCard({ currentPoints, nextRewardPoints, userLevel = "Gold" }: PointsCardProps) {
  const progressPercentage = (currentPoints / nextRewardPoints) * 100;

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Seus Pontos</CardTitle>
            <CardDescription>Acumule pontos e troque por recompensas</CardDescription>
          </div>
          <Badge className="bg-gradient-primary text-white">
            <Trophy className="w-4 h-4 mr-1" />
            Nível {userLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {currentPoints.toLocaleString()}
            </div>
            <p className="text-muted-foreground">pontos disponíveis</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Próxima recompensa em {nextRewardPoints - currentPoints} pontos</span>
              <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}