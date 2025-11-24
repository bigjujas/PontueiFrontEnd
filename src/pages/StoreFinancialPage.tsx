import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { TrendingUp, TrendingDown, DollarSign, Calendar, Filter, Download } from "lucide-react";

const mockTransactions = [
  { id: 1, type: "entrada", description: "Venda - Pedido #001", amount: 45.90, date: "2024-01-15", category: "Vendas" },
  { id: 2, type: "saida", description: "Compra de ingredientes", amount: -120.00, date: "2024-01-14", category: "Fornecedores" },
  { id: 3, type: "entrada", description: "Venda - Pedido #002", amount: 32.50, date: "2024-01-14", category: "Vendas" },
  { id: 4, type: "saida", description: "Taxa de entrega", amount: -5.00, date: "2024-01-13", category: "Taxas" },
  { id: 5, type: "entrada", description: "Venda - Pedido #003", amount: 78.90, date: "2024-01-13", category: "Vendas" },
];

const monthlyStats = {
  totalRevenue: 2450.80,
  totalExpenses: 890.50,
  netProfit: 1560.30,
  transactionCount: 45
};

export default function StoreFinancialPage() {
  const [transactions] = useState(mockTransactions);
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  };

  const getTransactionColor = (type: string) => {
    return type === "entrada" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Financeiro</h1>
              <p className="text-muted-foreground">Acompanhe o desempenho financeiro da sua loja</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtrar
              </Button>
              <Button className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(monthlyStats.totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(monthlyStats.totalExpenses)}
                </div>
                <p className="text-xs text-muted-foreground">
                  -5% em relação ao mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(monthlyStats.netProfit)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +18% em relação ao mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transações</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.transactionCount}</div>
                <p className="text-xs text-muted-foreground">
                  Este mês
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Período de Análise</CardTitle>
              <CardDescription>Selecione o período para visualizar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {["7", "30", "90", "365"].map((days) => (
                  <Button
                    key={days}
                    variant={selectedPeriod === days ? "default" : "outline"}
                    onClick={() => setSelectedPeriod(days)}
                  >
                    {days === "7" ? "7 dias" : 
                     days === "30" ? "30 dias" : 
                     days === "90" ? "3 meses" : "1 ano"}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extrato de Transações</CardTitle>
              <CardDescription>Histórico detalhado de entradas e saídas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          transaction.type === "entrada" ? "bg-green-500" : "bg-red-500"
                        }`} />
                        <div>
                          <h3 className="font-medium">{transaction.description}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')} • {transaction.category}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.type === "entrada" ? "+" : "-"}{formatCurrency(transaction.amount)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
    </div>
  );
}