import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMyEstablishment, updateEstablishment } from "@/services/store";
import { toast } from "sonner";

import { Upload, Palette, Image, Save } from "lucide-react";

export default function StoreCustomizePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customization, setCustomization] = useState({
    logo_url: "",
    cover_url: "",
    name: "",
    description: ""
  });

  useEffect(() => {
    loadEstablishment();
  }, []);

  const loadEstablishment = async () => {
    try {
      const establishment = await getMyEstablishment();
      setCustomization({
        logo_url: establishment.logo_url || "",
        cover_url: establishment.cover_url || "",
        name: establishment.name,
        description: establishment.description
      });
    } catch (error) {
      toast.error('Erro ao carregar dados da loja');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomization(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        name: customization.name,
        description: customization.description,
        // Descomente as linhas abaixo após reiniciar o backend:
        logo_url: customization.logo_url || undefined,
        cover_url: customization.cover_url || undefined
      };
      console.log('Enviando payload:', payload);
      await updateEstablishment(payload);
      toast.success('Loja atualizada com sucesso!');
    } catch (error) {
      console.error('Erro completo:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-center py-8">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Personalizar Página</h1>
            <p className="text-muted-foreground">Configure a aparência da sua loja</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Imagens da Loja
                </CardTitle>
                <CardDescription>Adicione banner e foto de perfil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>URL do Banner</Label>
                  <Input
                    value={customization.cover_url}
                    onChange={(e) => handleInputChange('cover_url', e.target.value)}
                    placeholder="https://exemplo.com/banner.jpg"
                  />
                  {customization.cover_url && (
                    <div className="mt-2">
                      <img 
                        src={customization.cover_url} 
                        alt="Preview do banner"
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>URL do Logo</Label>
                  <Input
                    value={customization.logo_url}
                    onChange={(e) => handleInputChange('logo_url', e.target.value)}
                    placeholder="https://exemplo.com/logo.jpg"
                  />
                  {customization.logo_url && (
                    <div className="mt-2">
                      <img 
                        src={customization.logo_url} 
                        alt="Preview do logo"
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações da Loja</CardTitle>
                <CardDescription>Atualize as informações básicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome da Loja</Label>
                  <Input
                    value={customization.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Nome da sua loja"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Input
                    value={customization.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descrição da sua loja"
                  />
                </div>
              </CardContent>
            </Card>
          </div>



          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
    </div>
  );
}