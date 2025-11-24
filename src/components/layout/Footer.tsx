import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection"; 

export function Footer() {
  return (
    <AnimatedSection>
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center border-b border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Fique por dentro das novidades
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Receba ofertas exclusivas, novos parceiros e dicas para maximizar seus pontos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="flex-1"
              />
              <Button>
                Cadastrar
              </Button>
            </div>
          </div>

          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">PONTUEI</h2>
              <p className="text-muted-foreground">
                Transformando cada compra em uma oportunidade de economia. 
                Conectamos você com as melhores ofertas da sua cidade.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Links Úteis</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#funcionalidades" className="text-muted-foreground hover:text-primary transition-colors">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#como-comecar" className="text-muted-foreground hover:text-primary transition-colors">
                    Como Começar
                  </a>
                </li>
                <li>
                  <a href="/admin-store" className="text-muted-foreground hover:text-primary transition-colors">
                    Lojas Parceiras
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Central de Ajuda
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">pontuei.co@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm">(53) 99135-4724</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">Pelotas, RS</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="py-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Pontuei. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
}

