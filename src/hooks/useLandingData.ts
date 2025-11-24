import { ShoppingBag, Gift, Smartphone, MapPin, CreditCard, TrendingUp } from "lucide-react";

export function useLandingData() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Compre e Pontue",
      description: "Acumule pontos a cada compra realizada nas lojas parceiras do Pontuei.",
    },
    {
      icon: Gift,
      title: "Troque por Prêmios",
      description: "Use seus pontos para ganhar descontos, produtos e experiências exclusivas.",
    },
    {
      icon: Smartphone,
      title: "App Intuitivo",
      description: "Interface moderna e fácil de usar, disponível para iOS e Android.",
    },
    {
      icon: MapPin,
      title: "Lojas Próximas",
      description: "Encontre facilmente as lojas parceiras mais próximas de você.",
    },
    {
      icon: CreditCard,
      title: "Pagamento Seguro",
      description: "Sistema de pagamento integrado com máxima segurança para suas transações.",
    },
    {
      icon: TrendingUp,
      title: "Acompanhe o Progresso",
      description: "Veja seu histórico de pontos e acompanhe suas economias em tempo real.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Baixe o App",
      description: "Faça o download gratuito do Pontuei na App Store ou Google Play e crie sua conta em segundos.",
    },
    {
      step: "02",
      title: "Encontre Lojas",
      description: "Use nosso mapa para localizar lojas parceiras próximas a você ou navegue por categorias.",
    },
    {
      step: "03",
      title: "Compre e Pontue",
      description: "Realize suas compras normalmente e apresente seu QR Code para acumular pontos automaticamente.",
    },
    {
      step: "04",
      title: "Troque por Prêmios",
      description: "Use seus pontos para conseguir descontos, produtos gratuitos ou experiências exclusivas.",
    },
  ];

  return {
    features,
    steps
  };
}