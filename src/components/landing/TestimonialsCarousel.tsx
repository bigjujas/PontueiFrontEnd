"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const testimonials = [
  {
    quote: "O Pontuei mudou completamente como eu faço compras! Já economizei mais de R$ 500 só este mês.",
    name: "Maria Silva",
    title: "Cliente frequente",
  },
  {
    quote: "Aplicativo incrível! Super fácil de usar e as recompensas são realmente valiosas.",
    name: "João Santos",
    title: "Usuário há 6 meses",
  },
  {
    quote: "Desde que me associei ao Pontuei, minhas vendas aumentaram 40%. Recomendo demais!",
    name: "Ana Costa",
    title: "Dona de loja parceira",
  },
  {
    quote: "Melhor app de pontos que já usei. Interface linda e funciona perfeitamente!",
    name: "Pedro Lima",
    title: "Cliente VIP",
  },
  {
    quote: "Revolucionou meu negócio! Os clientes voltam mais e gastam mais. Simplesmente fantástico!",
    name: "Carla Mendes",
    title: "Empresária",
  },
  {
    quote: "Nunca vi um app tão bem feito. Design lindo e funciona sem travamentos. Nota 10!",
    name: "Roberto Alves",
    title: "Cliente há 1 ano",
  },
  {
    quote: "Indico para todos os meus seguidores! É incrível como economizo nas compras do dia a dia.",
    name: "Fernanda Rocha",
    title: "Influencer",
  },
  {
    quote: "Nossos clientes adoram! Aumentou muito a frequência de visitas na nossa loja.",
    name: "Carlos Eduardo",
    title: "Gerente de loja",
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tighter">
            O que nossos usuários{" "}
            <span className="text-transparent bg-clip-text bg-gradient-primary">
              estão dizendo
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de pessoas já transformaram suas compras com o Pontuei
          </p>
        </div>

        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="py-8"
        />
      </div>
    </section>
  );
}