import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  showNotifications?: boolean;
  showLogout?: boolean;
  onNotificationClick?: () => void;
  onLogoutClick?: () => void;
}

export function PageHeader({ 
  title = "Pontuei", 
  showNotifications = true, 
  showLogout = true,
  onNotificationClick,
  onLogoutClick 
}: PageHeaderProps) {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {showNotifications && (
            <Button variant="ghost" size="sm" onClick={onNotificationClick}>
              <Bell className="w-4 h-4" />
            </Button>
          )}
          {showLogout && (
            <Button variant="ghost" size="sm" onClick={onLogoutClick}>
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}