import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { getMyProducts, createProduct, updateProduct, Product } from "@/services/store";
import { toast } from "sonner";



export default function StoreProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    points_price: "",
    description: "",
    photo_url: ""
  });

  const [editProduct, setEditProduct] = useState({
    name: "",
    price: "",
    points_price: "",
    description: "",
    photo_url: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productList = await getMyProducts();
      setProducts(productList);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field: string, value: string) => {
    setEditProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Preencha nome e preço do produto');
      return;
    }

    setIsSubmitting(true);
    try {
      const product = await createProduct({
        name: newProduct.name,
        price: newProduct.price,
        points_price: newProduct.points_price ? parseInt(newProduct.points_price) : undefined,
        description: newProduct.description || undefined,
        photo_url: newProduct.photo_url || undefined
      });
      
      setProducts([...products, product]);
      setNewProduct({ name: "", price: "", points_price: "", description: "", photo_url: "" });
      setShowAddForm(false);
      toast.success('Produto criado com sucesso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao criar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditProduct({
      name: product.name,
      price: product.price.toString(),
      points_price: product.points_price?.toString() || "",
      description: product.description || "",
      photo_url: product.photo_url || ""
    });
    setShowEditForm(true);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct || !editProduct.name || !editProduct.price) {
      toast.error('Preencha nome e preço do produto');
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedProduct = await updateProduct(editingProduct.id, {
        name: editProduct.name,
        price: editProduct.price,
        points_price: editProduct.points_price ? parseInt(editProduct.points_price) : undefined,
        description: editProduct.description || undefined,
        photo_url: editProduct.photo_url || undefined
      });
      
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setShowEditForm(false);
      setEditingProduct(null);
      toast.success('Produto atualizado com sucesso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    // TODO: Implementar delete no backend
    setProducts(products.filter(p => p.id !== id));
    toast.success('Produto removido');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Configurar Produtos</h1>
              <p className="text-muted-foreground">Gerencie o catálogo da sua loja</p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </div>

          {showEditForm && editingProduct && (
            <Card>
              <CardHeader>
                <CardTitle>Editar Produto</CardTitle>
                <CardDescription>Atualize as informações do produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Produto</Label>
                    <Input
                      value={editProduct.name}
                      onChange={(e) => handleEditInputChange('name', e.target.value)}
                      placeholder="Ex: Hambúrguer Clássico"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editProduct.price}
                      onChange={(e) => handleEditInputChange('price', e.target.value)}
                      placeholder="25.90"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço em Pontos</Label>
                    <Input
                      type="number"
                      value={editProduct.points_price}
                      onChange={(e) => handleEditInputChange('points_price', e.target.value)}
                      placeholder="250"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Input
                    value={editProduct.description}
                    onChange={(e) => handleEditInputChange('description', e.target.value)}
                    placeholder="Descrição do produto"
                  />
                </div>

                <div className="space-y-2">
                  <Label>URL da Foto (opcional)</Label>
                  <Input
                    value={editProduct.photo_url}
                    onChange={(e) => handleEditInputChange('photo_url', e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleUpdateProduct}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Atualizando...' : 'Atualizar Produto'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowEditForm(false)}>Cancelar</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Produto</CardTitle>
                <CardDescription>Preencha as informações do produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Produto</Label>
                    <Input
                      value={newProduct.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ex: Hambúrguer Clássico"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="25.90"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço em Pontos</Label>
                    <Input
                      type="number"
                      value={newProduct.points_price}
                      onChange={(e) => handleInputChange('points_price', e.target.value)}
                      placeholder="250"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Input
                    value={newProduct.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descrição do produto"
                  />
                </div>

                <div className="space-y-2">
                  <Label>URL da Foto (opcional)</Label>
                  <Input
                    value={newProduct.photo_url}
                    onChange={(e) => handleInputChange('photo_url', e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddProduct}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Criando...' : 'Adicionar Produto'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancelar</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Produtos Cadastrados
              </CardTitle>
              <CardDescription>Total: {products.length} produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <p className="text-center py-8 text-muted-foreground">Carregando produtos...</p>
                ) : products.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Nenhum produto cadastrado ainda</p>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      {product.photo_url && (
                        <img 
                          src={product.photo_url} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.description && `${product.description} • `}
                          {product.points_price && `${product.points_price} pontos • `}
                          {product.is_active ? 'Ativo' : 'Inativo'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="font-bold text-lg">R$ {Number(product.price).toFixed(2)}</span>
                          <div className="text-sm text-muted-foreground">{product.points_price || 0} pontos</div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
    </div>
  );
}