import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, MapPin, Store, Settings, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createStore } from "@/services/store";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function StoreRegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { updateEstablishmentInfo } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    cnpj: "",
    companyName: "",
    tradeName: "",

    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",

    phone: "",
    category: "",
    storeName: "",
    storeDescription: "",
    
    workingHours: "",
    website: "",
    socialMedia: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!formData.storeName || !formData.category || !formData.storeDescription) {
      toast.error('Preencha os campos obrigatórios: Nome, Categoria e Descrição');
      return;
    }

    // Verificar se o usuário está logado
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Você precisa estar logado para criar uma loja');
      navigate('/login');
      return;
    }
    
    console.log('Usuário logado, token presente:', !!token);

    const fullAddress = `${formData.address}, ${formData.number}${formData.complement ? ', ' + formData.complement : ''}, ${formData.neighborhood}, ${formData.city} - ${formData.state}, ${formData.zipCode}`;

    setIsSubmitting(true);
    try {
      const newStore = await createStore({
        name: formData.storeName,
        category: formData.category,
        description: formData.storeDescription,
        address: fullAddress
      });
      
      // Atualizar o contexto com as informações da nova loja
      updateEstablishmentInfo(newStore.name);
      
      toast.success('Loja cadastrada com sucesso!');
      navigate('/store-dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao cadastrar loja');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 4;
  const stepTitles = [
    "Dados da Empresa", 
    "Localização da Loja",
    "Informações do Estabelecimento",
    "Configurações Finais"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-light via-background to-pink-light overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/30 via-pink-glow/20 to-transparent blur-3xl animate-float"
        />
        <motion.div 
          className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-glow/25 via-primary/20 to-transparent blur-3xl animate-float-slow"
        />
        <motion.div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/20 via-pink-light/30 to-transparent blur-3xl animate-pulse-glow"
        />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-glow">
              Cadastro Completo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Passo {currentStep} de {totalSteps}: {stepTitles[currentStep - 1]}
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  i < currentStep - 1 
                    ? 'bg-primary border-primary text-white' 
                    : i === currentStep - 1
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                }`}>
                  {i < currentStep - 1 ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{i + 1}</span>
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                    i < currentStep - 1 ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-0 shadow-elegant bg-card/90 backdrop-blur-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                {currentStep === 1 && <><Building2 className="w-7 h-7 text-primary" /> Dados da Empresa</>}
                {currentStep === 2 && <><MapPin className="w-7 h-7 text-primary" /> Localização da Loja</>}
                {currentStep === 3 && <><Store className="w-7 h-7 text-primary" /> Informações do Estabelecimento</>}
                {currentStep === 4 && <><Settings className="w-7 h-7 text-primary" /> Configurações Finais</>}
              </CardTitle>
              <CardDescription className="text-lg">
                {currentStep === 1 && "Informações legais da sua empresa"}
                {currentStep === 2 && "Onde sua loja está localizada"}
                {currentStep === 3 && "Como sua loja será apresentada"}
                {currentStep === 4 && "Últimos detalhes para finalizar"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
                {currentStep === 1 && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="space-y-3">
                      <Label htmlFor="cnpj" className="text-base font-medium">CNPJ</Label>
                      <Input
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpj}
                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="companyName" className="text-base font-medium">Razão Social</Label>
                      <Input
                        id="companyName"
                        placeholder="Nome da empresa conforme CNPJ"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="tradeName" className="text-base font-medium">Nome Fantasia</Label>
                      <Input
                        id="tradeName"
                        placeholder="Nome comercial da loja"
                        value={formData.tradeName}
                        onChange={(e) => handleInputChange('tradeName', e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>

                    <motion.div 
                      className="flex gap-6 pt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Button 
                        className="flex-1 text-lg py-6 h-14 group shadow-glow hover:shadow-primary/50"
                        onClick={nextStep}
                        disabled={!formData.tradeName}
                      >
                        Próximo Passo
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        placeholder="00000-000"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          placeholder="Nome da rua"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          placeholder="123"
                          value={formData.number}
                          onChange={(e) => handleInputChange('number', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          placeholder="Apto, sala, loja (opcional)"
                          value={formData.complement}
                          onChange={(e) => handleInputChange('complement', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          placeholder="Nome do bairro"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          placeholder="Nome da cidade"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          placeholder="UF"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        variant="outline"
                        className="flex-1 text-lg py-6"
                        onClick={prevStep}
                      >
                        Voltar
                      </Button>
                      <Button 
                        className="flex-1 text-lg py-6 group"
                        onClick={nextStep}
                        disabled={!formData.address || !formData.city}
                      >
                        Próximo Passo
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Nome do Estabelecimento</Label>
                      <Input
                        id="storeName"
                        placeholder="Como sua loja será conhecida"
                        value={formData.storeName}
                        onChange={(e) => handleInputChange('storeName', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storeDescription">Descrição da Loja</Label>
                      <Input
                        id="storeDescription"
                        placeholder="Descreva o que sua loja oferece"
                        value={formData.storeDescription}
                        onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <select
                          id="category"
                          className="w-full px-3 py-2 border border-border rounded-md bg-background"
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="alimentacao">Alimentação</option>
                          <option value="moda">Moda e Vestuário</option>
                          <option value="beleza">Beleza e Estética</option>
                          <option value="farmacia">Farmácia</option>
                          <option value="eletronicos">Eletrônicos</option>
                          <option value="casa">Casa e Decoração</option>
                          <option value="servicos">Serviços</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        variant="outline"
                        className="flex-1 text-lg py-6"
                        onClick={prevStep}
                      >
                        Voltar
                      </Button>
                      <Button 
                        className="flex-1 text-lg py-6 group"
                        onClick={nextStep}
                        disabled={!formData.storeName || !formData.category}
                      >
                        Próximo Passo
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="workingHours">Horário de Funcionamento</Label>
                      <Input
                        id="workingHours"
                        placeholder="Ex: Segunda a Sexta: 8h às 18h"
                        value={formData.workingHours}
                        onChange={(e) => handleInputChange('workingHours', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Site (opcional)</Label>
                      <Input
                        id="website"
                        placeholder="https://www.sualoja.com.br"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="socialMedia">Redes Sociais (opcional)</Label>
                      <Input
                        id="socialMedia"
                        placeholder="@sualoja no Instagram"
                        value={formData.socialMedia}
                        onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        variant="outline"
                        className="flex-1 text-lg py-6"
                        onClick={prevStep}
                      >
                        Voltar
                      </Button>
                      <div className="flex-1">
                        <Button 
                          className="w-full text-lg py-6 group"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}


            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}