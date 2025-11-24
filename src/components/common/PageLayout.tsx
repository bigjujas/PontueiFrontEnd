import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  showNotifications?: boolean;
  showLogout?: boolean;
  onNotificationClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export function PageLayout({ 
  children, 
  showHeader = true,
  headerTitle,
  showNotifications,
  showLogout,
  onNotificationClick,
  onLogoutClick,
  className = "min-h-screen bg-gradient-to-br from-background to-secondary/20"
}: PageLayoutProps) {
  return (
    <div className={className}>
      {showHeader && (
        <PageHeader 
          title={headerTitle}
          showNotifications={showNotifications}
          showLogout={showLogout}
          onNotificationClick={onNotificationClick}
          onLogoutClick={onLogoutClick}
        />
      )}
      {children}
    </div>
  );
}