import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStoreOrders, updateOrderStatus, Order } from "@/services/store";
import { toast } from "sonner";

import { ShoppingCart, Clock, CheckCircle, XCircle, Eye, Truck } from "lucide-react";



export default function StoreOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const orderList = await getStoreOrders();
      setOrders(orderList);
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ["Todos", "pending", "preparing", "ready", "completed", "cancelled"];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "preparing": return "Preparando";
      case "ready": return "Pronto";
      case "completed": return "Entregue";
      case "cancelled": return "Cancelado";
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gray-100 text-gray-800";
      case "preparing": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <ShoppingCart className="w-4 h-4" />;
      case "preparing": return <Clock className="w-4 h-4" />;
      case "ready": return <CheckCircle className="w-4 h-4" />;
      case "completed": return <Truck className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <ShoppingCart className="w-4 h-4" />;
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success('Status do pedido atualizado!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar status');
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderItems = (order: Order) => {
    return order.order_items.map(item => 
      `${item.quantity}x ${item.product.name}`
    ).join(', ');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <p className="text-center py-8">Carregando pedidos...</p>
      </div>
    );
  }

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
                  {orders.filter(o => o.status === "preparing").length}
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
                  {orders.filter(o => o.status === "ready").length}
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
                  {formatCurrency(orders.reduce((sum, order) => sum + Number(order.total_amount), 0))}
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
                    {status === "Todos" ? status : getStatusLabel(status)}
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
                          <h3 className="font-bold">Pedido #{order.id.slice(-6)}</h3>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{formatTime(order.created_at)}</span>
                        </div>
                        <p className="font-medium">{order.client.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(Number(order.total_amount))}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-1">Itens:</p>
                      <p className="text-sm">{getOrderItems(order)}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Detalhes
                      </Button>
                      {order.status === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateOrderStatus(order.id, "preparing")}
                        >
                          Iniciar Preparo
                        </Button>
                      )}
                      {order.status === "preparing" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateOrderStatus(order.id, "ready")}
                        >
                          Marcar como Pronto
                        </Button>
                      )}
                      {order.status === "ready" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateOrderStatus(order.id, "completed")}
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