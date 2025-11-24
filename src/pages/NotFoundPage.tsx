import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center space-y-4">
        <h1 className="text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-2xl font-semibold text-foreground">Página Não Encontrada</p>
        <p className="text-muted-foreground max-w-sm">
          Oops! A página que você está procurando não existe. Pode ter sido movida ou excluída.
        </p>
        <Link to="/" className="inline-block">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Voltar para o Início
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

