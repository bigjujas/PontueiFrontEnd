import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, 
  Users, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Eye,
  Plus,
  BarChart3,
  ShoppingBag,
  Gift,
  CreditCard,
  FileText
} from "lucide-react";
import { StoreSidebar, StoreHeader } from "@/components/store";

const setupTasks = [
  { id: 1, title: "Cadastro Completo", completed: false, description: "CNPJ, endereço, documentos" },
  { id: 2, title: "Personalizar Página", completed: false, description: "Banner, logo, cores" },
  { id: 3, title: "Configurar Produtos", completed: false, description: "Adicionar produtos/serviços" },
  { id: 4, title: "Configurar Cardápio", completed: false, description: "Menu e sistema de pontos" }
];

export function StoreDashboard() {
  const [completedTasks] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const totalTasks = setupTasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <StoreSidebar />
      <StoreHeader />
      
      <div className="ml-64 mt-16 p-6">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pontos Distribuídos</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231</div>
                <p className="text-xs text-muted-foreground">
                  +8% em relação ao mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 12,345</div>
                <p className="text-xs text-muted-foreground">
                  +15% em relação ao mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  +0.5% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Clientes
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Transações
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Recompensas
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Setup Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Configuração da Loja
                    </CardTitle>
                    <CardDescription>Complete todos os passos para ativar sua loja</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progresso geral</span>
                        <span className="text-sm text-muted-foreground">{completedTasks}/{totalTasks} concluídos</span>
                      </div>
                      <Progress value={progressPercentage} className="h-3" />
                      
                      <div className="space-y-3 mt-6">
                        {setupTasks.map((task) => (
                          <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                            {task.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-orange-500" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                            {!task.completed && (
                              <Button size="sm" variant="outline">Configurar</Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Gerencie sua loja de forma rápida e eficiente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-20 flex flex-col gap-2">
                      <Plus className="h-6 w-6" />
                      Adicionar Cliente
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Eye className="h-6 w-6" />
                      Ver Relatórios
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Settings className="h-6 w-6" />
                      Configurações
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>
                    Últimas transações e atividades da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">João Silva ganhou 50 pontos</p>
                        <p className="text-sm text-muted-foreground">Compra de R$ 100,00 - Há 2 horas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+50 pts</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Maria Santos resgatou recompensa</p>
                        <p className="text-sm text-muted-foreground">Desconto de 10% - Há 4 horas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">-100 pts</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Carlos Oliveira se cadastrou</p>
                        <p className="text-sm text-muted-foreground">Novo cliente - Há 6 horas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-600">Novo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Clientes</CardTitle>
                  <CardDescription>
                    Visualize e gerencie todos os seus clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Funcionalidade de gerenciamento de clientes em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Transações</CardTitle>
                  <CardDescription>
                    Visualize todas as transações de pontos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Funcionalidade de transações em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Recompensas</CardTitle>
                  <CardDescription>
                    Crie e gerencie as recompensas da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Funcionalidade de recompensas em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios e Análises</CardTitle>
                  <CardDescription>
                    Visualize relatórios detalhados do seu negócio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Funcionalidade de relatórios em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}