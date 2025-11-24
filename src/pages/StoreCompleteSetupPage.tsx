import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const setupSteps = [
  { 
    id: 1, 
    title: "Cadastro Completo", 
    description: "CNPJ, endereço, documentos",
    route: "/store-register",
    completed: false 
  },
  { 
    id: 2, 
    title: "Personalizar Página", 
    description: "Banner, logo, cores",
    route: "/store/customize",
    completed: false 
  },
  { 
    id: 3, 
    title: "Configurar Produtos", 
    description: "Adicionar produtos/serviços",
    route: "/store/products",
    completed: false 
  },
  { 
    id: 4, 
    title: "Configurar Cardápio", 
    description: "Menu e sistema de pontos",
    route: "/store/menu",
    completed: false 
  }
];

export default function StoreCompleteSetupPage() {
  const [steps, setSteps] = useState(setupSteps);
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const allCompleted = completedSteps === totalSteps;

  const handleCompleteSetup = () => {
    setSteps(steps.map(step => ({ ...step, completed: true })));
    
    localStorage.setItem('storeRegistrationComplete', 'true');
    
    window.location.href = '/store-dashboard';
  };

  const markStepAsCompleted = (stepId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Concluir Cadastro</h1>
        <p className="text-muted-foreground">Complete todos os passos para ativar sua loja</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Progresso da Configuração
          </CardTitle>
          <CardDescription>
            {completedSteps} de {totalSteps} passos concluídos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progresso geral</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% completo
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.id} className={`transition-all ${step.completed ? 'bg-green-50 border-green-200' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {step.completed ? (
                    <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                  ) : (
                    <Badge variant="outline">Pendente</Badge>
                  )}
                  {!step.completed && (
                    <div className="flex gap-2">
                      <Link to={step.route}>
                        <Button className="flex items-center gap-2">
                          Configurar
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        onClick={() => markStepAsCompleted(step.id)}
                      >
                        Marcar como Feito
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {allCompleted && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Parabéns! Configuração Completa</h3>
            <p className="text-muted-foreground mb-4">
              Todos os passos foram concluídos. Sua loja está pronta para funcionar!
            </p>
            <Button onClick={handleCompleteSetup} size="lg" className="flex items-center gap-2 mx-auto">
              Finalizar e Ativar Loja
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Como funciona?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Complete cada passo clicando em "Configurar" ou "Marcar como Feito"</p>
            <p>• Você pode fazer os passos em qualquer ordem</p>
            <p>• Quando todos estiverem completos, clique em "Finalizar e Ativar Loja"</p>
            <p>• Após finalizar, esta opção desaparecerá do menu lateral</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}