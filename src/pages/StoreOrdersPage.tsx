import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ShoppingCart, Clock, CheckCircle, XCircle, Eye, Truck } from "lucide-react";

const mockOrders = [
  { 
    id: "001", 
    customer: "João Silva", 
    items: ["2x Hambúrguer", "1x Refrigerante"], 
    total: 57.80, 
    status: "Preparando", 
    time: "14:30",
    address: "Rua das Flores, 123"
  },
  { 
    id: "002", 
    customer: "Maria Santos", 
    items: ["1x Pizza Margherita", "1x Suco"], 
    total: 42.50, 
    status: "Pronto", 
    time: "14:15",
    address: "Av. Principal, 456"
  },
  { 
    id: "003", 
    customer: "Pedro Costa", 
    items: ["3x Pastel", "2x Refrigerante"], 
    total: 28.90, 
    status: "Entregue", 
    time: "13:45",
    address: "Rua do Comércio, 789"
  },
  { 
    id: "004", 
    customer: "Ana Oliveira", 
    items: ["1x Hambúrguer Especial"], 
    total: 35.00, 
    status: "Cancelado", 
    time: "13:20",
    address: "Rua Nova, 321"
  },
];

export default function StoreOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const statusOptions = ["Todos", "Preparando", "Pronto", "Entregue", "Cancelado"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparando": return "bg-yellow-100 text-yellow-800";
      case "Pronto": return "bg-blue-100 text-blue-800";
      case "Entregue": return "bg-green-100 text-green-800";
      case "Cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Preparando": return <Clock className="w-4 h-4" />;
      case "Pronto": return <CheckCircle className="w-4 h-4" />;
      case "Entregue": return <Truck className="w-4 h-4" />;
      case "Cancelado": return <XCircle className="w-4 h-4" />;
      default: return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = selectedStatus === "Todos" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pedidos</h1>
            <p className="text-muted-foreground">Gerencie todos os pedidos da sua loja</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Hoje</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">pedidos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Preparando</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === "Preparando").length}
                </div>
                <p className="text-xs text-muted-foreground">pedidos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prontos</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === "Pronto").length}
                </div>
                <p className="text-xs text-muted-foreground">pedidos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
                <Truck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
                </div>
                <p className="text-xs text-muted-foreground">hoje</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Filtrar Pedidos</CardTitle>
              <CardDescription>Visualize pedidos por status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    onClick={() => setSelectedStatus(status)}
                    className="flex items-center gap-2"
                  >
                    {getStatusIcon(status)}
                    {status}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pedidos do Dia</CardTitle>
              <CardDescription>
                Mostrando {filteredOrders.length} de {orders.length} pedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold">Pedido #{order.id}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{order.time}</span>
                        </div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(order.total)}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-1">Itens:</p>
                      <p className="text-sm">{order.items.join(", ")}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Detalhes
                      </Button>
                      {order.status === "Preparando" && (
                        <Button 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, "Pronto")}
                        >
                          Marcar como Pronto
                        </Button>
                      )}
                      {order.status === "Pronto" && (
                        <Button 
                          size="sm" 
                          onClick={() => updateOrderStatus(order.id, "Entregue")}
                        >
                          Marcar como Entregue
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
    </div>
  );
}