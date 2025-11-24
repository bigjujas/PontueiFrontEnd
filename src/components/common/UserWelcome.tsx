import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserWelcomeProps {
  userName: string;
  userInitials: string;
  avatarUrl?: string;
  welcomeMessage?: string;
}

export function UserWelcome({ 
  userName, 
  userInitials, 
  avatarUrl, 
  welcomeMessage = "Bem-vindo de volta ao seu dashboard" 
}: UserWelcomeProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Avatar className="w-16 h-16">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="bg-primary text-white text-xl">
          {userInitials}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold">Olá, {userName}!</h1>
        <p className="text-muted-foreground">{welcomeMessage}</p>
      </div>
    </div>
  );
}