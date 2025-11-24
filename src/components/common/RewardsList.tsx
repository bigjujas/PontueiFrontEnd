import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface Reward {
  title: string;
  points: number;
  store: string;
  available: boolean;
}

interface RewardsListProps {
  rewards: Reward[];
  userPoints: number;
  onRedeemReward?: (reward: Reward) => void;
}

export function RewardsList({ rewards, userPoints, onRedeemReward }: RewardsListProps) {
  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Gift className="w-5 h-5 mr-2" />
          Recompensas Disponíveis
        </CardTitle>
        <CardDescription>Troque seus pontos por prêmios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rewards.map((reward, index) => (
            <div key={index} className="p-3 rounded-lg border bg-card/50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{reward.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {reward.points} pts
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{reward.store}</p>
              <Button 
                size="sm" 
                className="w-full text-xs"
                disabled={userPoints < reward.points}
                onClick={() => onRedeemReward?.(reward)}
              >
                {userPoints >= reward.points ? 'Resgatar' : 'Pontos insuficientes'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}