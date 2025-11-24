import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface Transaction {
  store: string;
  points: string;
  date: string;
  type: 'earn' | 'redeem';
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Histórico Recente
        </CardTitle>
        <CardDescription>Suas últimas atividades de pontos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div>
                <p className="font-medium">{transaction.store}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <Badge 
                variant={transaction.type === 'earn' ? 'default' : 'secondary'}
                className={transaction.type === 'earn' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}
              >
                {transaction.points}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}